module.exports = function (grunt) {
	var globalConfig = {
		path: {
			dist: 'public',
			builds: {
				src: 'builds',
				includes: '<%= globalConfig.path.builds.src %>/_includes',
				dist: {
					root: '<%= globalConfig.path.dist %>',
					builds: '<%= globalConfig.path.dist %>/<%= globalConfig.path.builds.src %>'
				}
			},
			// Add additional src dirs for the "developed" templates
			cachebust: [
				'<%= globalConfig.path.builds.includes %>/foot.html',
				'<%= globalConfig.path.builds.includes %>/head.html',
				'<%= globalConfig.path.builds.dist.builds %>/*.html'
			],
			css: {
				src: 'css',
				dist: '<%= globalConfig.path.dist %>/css'
			},
			fonts: {
				src: 'fonts',
				dist: '<%= globalConfig.path.dist %>/fonts'
			},
			js: {
				src: 'js',
				vendor: '<%= globalConfig.path.js.src %>/vendor',
				dist: '<%= globalConfig.path.dist %>/<%= globalConfig.path.js.src %>',
				distvendor: '<%= globalConfig.path.js.dist %>/vendor'
			},
			images: {
				src: 'images',
				dist: '<%= globalConfig.path.dist %>/<%= globalConfig.path.images.src %>'
			}
		}
	};
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		globalConfig: globalConfig,
		
		fileindex: {
			custom: {
				options: {
					format: function(list) {
						return list.join('\n') + '\n';
					}
				},
				files: [
					{
						dest: '<%= globalConfig.path.builds.includes %>/index.html', src: ['<%= globalConfig.path.builds.src %>/*.html']
					}
				]
			}
		},
		
		sass: {
			dev: {
				options: {
					require: './ruby/functions/base64-encode.rb',
					style: 'expanded'
				},
				files: {
					'<%= globalConfig.path.css.dist %>/all.css': '<%= globalConfig.path.css.src %>/all.scss',
					'<%= globalConfig.path.css.dist %>/ltie9.css': '<%= globalConfig.path.css.src %>/ltie9.scss'
				}
			},
			dist: {
				options: {
					require: './ruby/functions/base64-encode.rb',
					style: 'compressed'
				},
				files: {
					'<%= globalConfig.path.css.dist %>/all.css': '<%= globalConfig.path.css.src %>/all.scss',
					'<%= globalConfig.path.css.dist %>/ltie9.css': '<%= globalConfig.path.css.src %>/ltie9.scss'
				}
			}
		},
		
		concat: {
			base: {
				src: [
					'<%= globalConfig.path.js.vendor %>/cssua.js',
					'<%= globalConfig.path.js.vendor %>/modernizr.js',
					'<%= globalConfig.path.js.vendor %>/supports.touch.js',
					'<%= globalConfig.path.js.vendor %>/izilla.gup.js',
					'<%= globalConfig.path.js.vendor %>/layout.engine.js',
					'<%= globalConfig.path.js.vendor %>/mq.genie.js'
				],
				dest: '<%= globalConfig.path.js.dist %>/base.js'
			},
			all: {
				// Customise as appropriate
				src: [
					'<%= globalConfig.path.js.vendor %>/matchMedia.js',
					'<%= globalConfig.path.js.vendor %>/matchMedia.addListener.js',
					'<%= globalConfig.path.js.vendor %>/enquire.js',
					'<%= globalConfig.path.js.vendor %>/rwd.images.js',
					'<%= globalConfig.path.js.vendor %>/class.query.js',
					'<%= globalConfig.path.js.vendor %>/swipe.js',
					'<%= globalConfig.path.js.vendor %>/firefox.hwa.js',
					'<%= globalConfig.path.js.vendor %>/fastclick.js',
					'<%= globalConfig.path.js.vendor %>/jquery.transit.js',
					'<%= globalConfig.path.js.src %>/all.js'
				],
				dest: '<%= globalConfig.path.js.dist %>/all.js'
			}
		},
		
		uglify: {
			base: {
				src: '<%= globalConfig.path.js.dist %>/base.js',
				dest: '<%= globalConfig.path.js.dist %>/base.js'
			},
			all: {
				src: '<%= globalConfig.path.js.dist %>/all.js',
				dest: '<%= globalConfig.path.js.dist %>/all.js'
			},
			vendor: {
				expand: true,
				cwd: '<%= globalConfig.path.js.vendor %>',
				src: '*js',
				dest: '<%= globalConfig.path.js.distvendor %>'
			}
		},
		
		copy: {
			fonts: {
				expand: true,
				cwd: '<%= globalConfig.path.fonts.src %>',
				src: '*.{eot,svg,ttf,woff,woff2}',
				dest: '<%= globalConfig.path.fonts.dist %>'
			},
			html: {
				expand: true,
				cwd: '<%= globalConfig.path.builds.dist.builds %>',
				src: '*.html',
				dest: '<%= globalConfig.path.dist %>'
			},
			js: {
				expand: true,
				cwd: '<%= globalConfig.path.js.vendor %>',
				src: '*.js',
				dest: '<%= globalConfig.path.js.distvendor %>'
			},
			pie: {
				src: '<%= globalConfig.path.css.src %>/PIE.htc',
				dest: '<%= globalConfig.path.css.dist %>/PIE.htc'
			}
		},

		twigger: {
			options: {
				twig: {
					base: '<%= globalConfig.path.builds.src %>'
				},
				data: [
					{
						cssPath: '/<%= globalConfig.path.css.src %>/',
						jsPath: '/<%= globalConfig.path.js.src %>/',
						jsVendorPath: '/<%= globalConfig.path.js.vendor %>/',
						imgPath: '/<%= globalConfig.path.images.src %>/',
						imgContentPath: '/<%= globalConfig.path.images.src %>/content/'
					},
					require('./data.js')
				],
				preRender: function(params) {
					params.data.currentPath = params.template.replace(/^builds\//, '');
				}
			},
			templates: {
				expand: true,
				cwd: '<%= globalConfig.path.builds.src %>',
				src: '*.html',
				dest: '<%= globalConfig.path.builds.dist.builds %>/'
			}
		},

		'regex-replace': {
			version: {
				src: [
					'README.md',
					'<%= globalConfig.path.css.src %>/all.scss'
				],
				actions: [
					{
						search: /v\d+\.\d+\.\d+\ \(\d{4}-\d{2}-\d{2}\)/g,
						replace: 'v<%= pkg.version %> (' + grunt.template.today('yyyy-mm-dd') + ')'
					}
				]
			},
			fileindex: {
				src: '<%= globalConfig.path.builds.includes %>/index.html',
				actions: [
					{
						search: /.*(base|index).html(\n|\r)/g,
						replace: ''
					},
					{
						search: /.*\/(.*?)(\.html)(\n|\r)/g,
						replace: function(str, p1, p2, p3) {
							var pageName = p1.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, function(a) {
								return a.toUpperCase();
							});
							
							return '<li><a class="feature" href="' + p1 + p2 + '">' + pageName + '</a></li>' + p3; 
						}
					}
				]
			},
			cachebustcss: {
				src: globalConfig.path.cachebust,
				actions: [
					{
						search: /(.css\?v=)\d+?(")/g,
						replace: '$1' + grunt.template.today('yymmddHHMMss') + '$2'
					}
				]
			},
			cachebustjs: {
				src: globalConfig.path.cachebust,
				actions: [
					{
						search: /(.js\?v=)\d+?(")/g,
						replace: '$1' + grunt.template.today('yymmddHHMMss') + '$2'
					}
				]
			},
			cssimages: {
				src: '<%= globalConfig.path.css.dist %>/*.css',
				actions: [
					{
						search: /{{ imgPath }}/g,
						replace: '/<%= globalConfig.path.images.src %>/'
					}
				]
			},
			csslinebreaks: {
				src: '<%= globalConfig.path.css.dist %>/*.css',
				actions: [
					{
						search: /(\r|\n)/g,
						replace: ''
					}
				]
			}
		},
		
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '<%= globalConfig.path.images.src %>',
					src: ['**/*.{png,jpg,gif,ico}'],
					dest: '<%= globalConfig.path.images.dist %>'
				}]
			}
		},
		
		svgmin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '<%= globalConfig.path.images.src %>',
					src: ['**/*.svg'],
					dest: '<%= globalConfig.path.images.dist %>'
				}]
			}
		},
		
		browserSync: {
			bsFiles: {
				src: ['<%= globalConfig.path.css.dist %>/*.css', '<%= globalConfig.path.dist %>/*.html', '<%= globalConfig.path.js.dist %>/*.js']
			},
			options: {
				notify: false,
				open: false,
				watchTask: true,
				server: {
					baseDir: '<%= globalConfig.path.dist %>/'
				}
			}
		},
		
		watch: {
			css: {
				files: ['<%= globalConfig.path.css.src %>/**/*.scss'],
				tasks: ['sass:dist', 'regex-replace:cachebustcss', 'regex-replace:cssimages', 'regex-replace:csslinebreaks'],
				options: {
					spawn: false,
				}
			},
			fonts: {
				files: ['<%= globalConfig.path.fonts.src %>/*.{eot,svg,ttf,woff,woff2}'],
				tasks: ['newer:copy:fonts'],
				options: {
					spawn: false,
				}
			},
			html: {
				files: ['<%= globalConfig.path.builds.src %>/**/*.html', '<%= globalConfig.path.builds.dist.builds %>/*.html'],
				tasks: ['fileindex', 'regex-replace:fileindex', 'twigger', 'newer:copy:html'],
				options: {
					spawn: false
				}
			},
			js: {
				files: ['<%= globalConfig.path.js.src %>/**/*.js'],
				tasks: ['newer:concat', 'newer:uglify', 'regex-replace:cachebustjs'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['<%= globalConfig.path.images.src %>/**/*.{png,jpg,gif,ico}'],
				tasks: ['newer:imagemin'],
				options: {
					spawn: false
				}
			},
			svgs: {
				files: ['<%= globalConfig.path.images.src %>/**/*.svg'],
				tasks: ['newer:svgmin'],
				options: {
					spawn: false
				}
			}
		},
		
		watchdev: {
			css: {
				files: ['<%= globalConfig.path.css.src %>/**/*.scss'],
				tasks: ['sass:dev', 'regex-replace:cachebustcss', 'regex-replace:cssimages'],
				options: {
					spawn: false,
				}
			},
			html: {
				files: ['<%= globalConfig.path.builds.src %>/**/*.html', '<%= globalConfig.path.builds.dist.builds %>/*.html'],
				tasks: ['fileindex', 'regex-replace:fileindex', 'twigger', 'newer:copy:html'],
				options: {
					spawn: false
				}
			},
			js: {
				files: ['<%= globalConfig.path.js.src %>/**/*.js'],
				tasks: ['newer:concat', 'regex-replace:cachebustjs'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['<%= globalConfig.path.images.src %>/**/*.{png,jpg,gif,ico}'],
				tasks: ['newer:imagemin'],
				options: {
					spawn: false
				}
			},
			svgs: {
				files: ['<%= globalConfig.path.images.src %>/**/*.svg'],
				tasks: ['newer:svgmin'],
				options: {
					spawn: false
				}
			}
		},
		
		htmllint: {
			options: {
				ignore: [
					'Bad value “X-UA-Compatible” for attribute “http-equiv” on XHTML element “meta”.',
					'Bad value “HandheldFriendly” for attribute “name” on XHTML element “meta”: Keyword “handheldfriendly” is not registered.',
					'Bad value “MobileOptimized” for attribute “name” on XHTML element “meta”: Keyword “mobileoptimized” is not registered.',
					'Bad value “” for attribute “width” on XHTML element “img”: The empty string is not a valid non-negative integer.',
					'Bad value “” for attribute “height” on XHTML element “img”: The empty string is not a valid non-negative integer.',
					'Bad value “aside” for attribute “role” on XHTML element “div”.',
					'Bad value “expiry” for attribute “name” on XHTML element “meta”: Keyword “expiry” is not registered.',
					'Bad value “owner” for attribute “name” on XHTML element “meta”: Keyword “owner” is not registered.',
					'The “language” attribute on the “script” element is obsolete. You can safely omit it.',
					'The “frameborder” attribute on the “iframe” element is obsolete. Use CSS instead.',
					'The “scrolling” attribute on the “iframe” element is obsolete. Use CSS instead.',
					'The “allowtransparency” attribute on the “iframe” element is obsolete. Use CSS instead.',
					'XHTML element “img” is missing required attribute “src”.'
				]
			},
			src: ['<%= globalConfig.path.builds.dist.builds %>/*.html']
		}
	
	});
	
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-fileindex');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-twigger');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.renameTask('watch', 'watchdev');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html');
	
	grunt.registerTask('build', ['sass:dist', 'regex-replace:cssimages', 'regex-replace:csslinebreaks', 'newer:concat', 'uglify', 'fileindex', 'regex-replace:fileindex', 'twigger', 'newer:imagemin', 'newer:svgmin', 'newer:copy:pie', 'newer:copy:fonts']);
	grunt.registerTask('default', ['build', 'newer:copy:html', 'browserSync', 'watch']);
	grunt.registerTask('dev', ['sass:dev', 'regex-replace:cssimages', 'concat', 'copy:js', 'fileindex', 'regex-replace:fileindex', 'twigger', 'newer:copy:html', 'newer:imagemin', 'newer:svgmin', 'newer:copy:pie', 'newer:copy:fonts', 'browserSync', 'watchdev']);
	grunt.registerTask('bust', ['regex-replace:cachebustcss', 'regex-replace:cachebustjs']);
	grunt.registerTask('validate', ['htmllint']);
	grunt.registerTask('version', ['regex-replace:version']);
};
