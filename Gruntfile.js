module.exports = function (grunt) {
	var globalConfig = {
		path: {
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
				includesDir: 'builds/includes/',
				globals: {
					currentYear: grunt.template.today('yyyy'),
					siteTitle: 'Project Name'
				}
			},
			templates: {
				src: 'builds/*.html',
				dest: 'dist/'
			}
		},
		
		'regex-replace': {
			cachebust: {
				// Add additional src dirs for the "developed" templates
				src: [
					'dist/builds/*.html'
				],
				actions: [
					{
						search: /(\?v=)\d+?(")/g,
						replace: '$1' + grunt.template.today('yymmddHHMMss') + '$2'
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
					dest: 'images/site'
				}]
			}
		},
		
		watch: {
			css: {
				files: ['<%= globalConfig.path.css.root %>/**/*.scss'],
				tasks: ['sass:dist'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['<%= globalConfig.path.js.root %>/**/*.js'],
				tasks: ['concat', 'uglify'],
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
				files: ['builds/**/*.html'],
				tasks: ['includereplace', 'regex-replace'],
				options: {
					spawn: false
				}
			}
		},
		
		watchdev: {
			css: {
				files: ['<%= globalConfig.path.css.root %>/**/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['<%= globalConfig.path.js.root %>/**/*.js'],
				tasks: ['concat'],
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
				files: ['builds/**/*.html'],
				tasks: ['includereplace', 'regex-replace'],
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
	
	grunt.registerTask('default', ['sass:dist', 'concat', 'uglify', 'includereplace', 'regex-replace', 'imagemin', 'watch']);
	grunt.registerTask('dev', ['sass:dev', 'concat', 'includereplace', 'regex-replace', 'imagemin', 'watchdev']);
	grunt.registerTask('bust', ['regex-replace']);
};