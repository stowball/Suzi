var fs = require('fs'),
	path = require('path'),
	_ = require('underscore');

// Generate a list of top-level templates (make-shift menu)
var menuItems =
	_.chain(fs.readdirSync(path.resolve(__dirname, 'builds')))
	.filter(function(f) {
		// Only get html files, excluding index and base
		return ~f.indexOf('.html') && (f !== "index.html" && f !== "base.html");
	})
	.map(function(f) {
		// Format strings
		capitalized = f[0].toUpperCase() + f.slice(1);
		return {
			path: '/dist/builds/' + f,
			title: capitalized.replace(/-/g, ' ').replace('.html', '')
		};
	})
	.reduce(function(out, f) {
		// Turn into markup
		return out + '<li><a class="feature" href="' + f.path + '">' + f.title + '</a></li>\n';
	}, '')
	.value().replace(/\n$/, '');

module.exports = function (grunt) {
	var globalConfig = {
		path: {
			builds: {
				root: 'builds',
				includes: 'builds/includes',
				dist: {
					root: 'dist',
					builds: 'dist/builds'
				}
			},
			// Add additional src dirs for the "developed" templates
			cachebust: [
				'<%= globalConfig.path.builds.includes %>/*.html',
				'<%= globalConfig.path.builds.dist.builds %>/*.html'
			],
			css: {
				root: 'css',
				site: 'css/site',
				src: 'css/src'
			},
			js: {
				root: 'js',
				src: 'js/src',
				site: 'js/site',
				build: 'js/build'
			},
			images: {
				site: 'images/site'
			}
		}
	};
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		globalConfig: globalConfig,
		
		sass: {
			dev: {
				options: {
					require: './sass/functions/base64-encode.rb',
					style: 'expanded'
				},
				files: {
					'<%= globalConfig.path.css.site %>/all.css': '<%= globalConfig.path.css.src %>/all.scss',
					'<%= globalConfig.path.css.site %>/ltie9.css': '<%= globalConfig.path.css.src %>/ltie9.scss'
				}
			},
			dist: {
				options: {
					require: './sass/functions/base64-encode.rb',
					style: 'compressed'
				},
				files: {
					'<%= globalConfig.path.css.site %>/all.css': '<%= globalConfig.path.css.src %>/all.scss',
					'<%= globalConfig.path.css.site %>/ltie9.css': '<%= globalConfig.path.css.src %>/ltie9.scss'
				}
			}
		},
		
		concat: {
			base: {
				src: [
					'<%= globalConfig.path.js.root %>/cssua.min.js',
					'<%= globalConfig.path.js.root %>/modernizr.min.js',
					'<%= globalConfig.path.js.root %>/supports.touch.min.js',
					'<%= globalConfig.path.js.root %>/izilla.gup.min.js',
					'<%= globalConfig.path.js.root %>/layout.engine.min.js',
					'<%= globalConfig.path.js.root %>/mq.genie.min.js'
				],
				dest: '<%= globalConfig.path.js.build %>/base.js'
			},
			all: {
				src: [
					'<%= globalConfig.path.js.root %>/class.query.min.js',
					'<%= globalConfig.path.js.root %>/swipe.min.js',
					'<%= globalConfig.path.js.root %>/firefox.hwa.min.js',
					'<%= globalConfig.path.js.root %>/fastclick.min.js',
					'<%= globalConfig.path.js.root %>/jquery.rwdImages.min.js',
					'<%= globalConfig.path.js.site %>/all.js'
				],
				dest: '<%= globalConfig.path.js.build %>/all.js'
			}
		},
		
		uglify: {
			base: {
				src: '<%= globalConfig.path.js.build %>/base.js',
				dest: '<%= globalConfig.path.js.build %>/base.js'
			},
			all: {
				src: '<%= globalConfig.path.js.build %>/all.js',
				dest: '<%= globalConfig.path.js.build %>/all.js'
			}
		},
		
		includereplace: {
			options: {
				includesDir: '<%= globalConfig.path.builds.includes %>',
				prefix: '{{ ',
				suffix: ' }}',
				globals: {
					currentYear: grunt.template.today('yyyy'),
					menuItems: menuItems,
					siteTitle: 'Project Name'
				}
			},
			templates: {
				src: '<%= globalConfig.path.builds.root %>/*.html',
				dest: '<%= globalConfig.path.builds.dist.root %>/'
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
			customvars: {
				src: '<%= globalConfig.path.builds.dist.builds %>/*.html',
				actions: [
					{
						search: /[\s\S]*/m,
						replace: function(str) {
							var variables = str.replace(/(\n|\r)/g, '').match(/\{\{ var (\$.*?): "(.*?)" \}\}/g),
								varLength = 0;
							
							if (variables)
								varLength += variables.length;
							
							if (varLength > 0) {
								for (var i = 0; i < varLength; i++) {
									str = str.replace(/\{\{ var (\$.*?): "(.*?)" \}\}[\s\S]*/m, function(str2, p1, p2) {
										var $var = p1.replace(/\$/g, '\\$');
										return str2.replace(new RegExp($var, 'g'), p2);
									});
								}
							}
							
							return str;
						}
					}
				]
			},
			currentpaths: {
				src: '<%= globalConfig.path.builds.dist.builds %>/*.html',
				actions: [
					{
						search: / \{(.*?\.html)\}(.*(?:"|'))((.*?\.html|#))/g,
						replace: function(str, p1, p2, p3) {
							return p1 == p3 ? ' class="current"' + p2 + p3 : p2 + p3;
						}
					}
				]
			},
			unusedvars: {
				src: '<%= globalConfig.path.builds.dist.builds %>/*.html',
				actions: [
					{
						search: /(\{\{+.*?\}\}+|\{[a-zA-Z]*?\})(\n|\r)?/g,
						replace: ''
					}
				]
			}
		},
		
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '<%= globalConfig.path.images.site %>',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= globalConfig.path.images.site %>'
				}]
			}
		},
		
		watch: {
			css: {
				files: ['<%= globalConfig.path.css.root %>/**/*.scss'],
				tasks: ['sass:dist', 'regex-replace:cachebustcss'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['<%= globalConfig.path.js.root %>/**/*.js'],
				tasks: ['concat', 'uglify', 'regex-replace:cachebustjs'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['<%= globalConfig.path.images.site %>/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['<%= globalConfig.path.builds.root %>/**/*.html', '<%= globalConfig.path.builds.dist.builds %>/*.html'],
				tasks: ['includereplace', 'regex-replace:customvars', 'regex-replace:currentpaths', 'regex-replace:unusedvars'],
				options: {
					spawn: false
				}
			}
		},
		
		watchdev: {
			css: {
				files: ['<%= globalConfig.path.css.root %>/**/*.scss'],
				tasks: ['sass:dev', 'regex-replace:cachebustcss'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['<%= globalConfig.path.js.root %>/**/*.js'],
				tasks: ['concat', 'regex-replace:cachebustjs'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['<%= globalConfig.path.images.site %>/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['<%= globalConfig.path.builds.root %>/**/*.html', '<%= globalConfig.path.builds.dist.builds %>/*.html'],
				tasks: ['includereplace', 'regex-replace:customvars', 'regex-replace:currentpaths', 'regex-replace:unusedvars'],
				options: {
					spawn: false
				}
			}
		}
	
	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.renameTask('watch', 'watchdev');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['sass:dist', 'concat', 'uglify', 'includereplace', 'regex-replace:customvars', 'regex-replace:currentpaths', 'regex-replace:unusedvars', 'imagemin', 'watch']);
	grunt.registerTask('dev', ['sass:dev', 'concat', 'includereplace', 'regex-replace:customvars', 'regex-replace:currentpaths', 'regex-replace:unusedvars', 'imagemin', 'watchdev']);
	grunt.registerTask('bust', ['regex-replace:cachebustcss', 'regex-replace:cachebustjs']);
	grunt.registerTask('version', ['sass:dist', 'regex-replace:version']);
};