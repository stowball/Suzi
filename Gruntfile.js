module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    sass: {
      dist: {
        options: {
          require: './sass/functions/base64-encode.rb',
          style: 'compressed'
        },
        files: {
          '<%= pkg.path.css.site %>/all.css': 'css/src/all.scss',
          '<%= pkg.path.css.site %>': '<%= pkg.path.css.src %>/ltie9.scss'
        }
      }
    },
    
    concat: {
      base: {
        src: [
          '<%= pkg.path.js.base %>/cssua.min.js',
          '<%= pkg.path.js.base %>/modernizr.min.js',
          '<%= pkg.path.js.base %>/supports.touch.min.js',
          '<%= pkg.path.js.base %>/izilla.gup.min.js',
          '<%= pkg.path.js.base %>/layout.engine.min.js',
          '<%= pkg.path.js.base %>/mq.genie.min.js'
        ],
        dest: '<%= pkg.path.js.build %>/base.js'
      },
      all: {
        src: [
          '<%= pkg.path.js.base %>/class.query.min.js',
          '<%= pkg.path.js.base %>/jquery.rwdImages.min.js',
          '<%= pkg.path.js.base %>/swipe.min.js',
          '<%= pkg.path.js.base %>/firefox.hwa.min.js',
          '<%= pkg.path.js.base %>/fastclick.min.js',
          '<%= pkg.path.js.base %>/site/all.js'
        ],
        dest: '<%= pkg.path.js.build %>/all.js'
      }
    },
    
    uglify: {
      base: {
        src: '<%= pkg.path.js.build %>/base.js',
        dest: '<%= pkg.path.js.build %>/base.min.js'
      },
      all: {
        src: '<%= pkg.path.js.build %>/all.js',
        dest: '<%= pkg.path.js.build %>/all.min.js'
      }
    },
    
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/site',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/site'
        }]
      }
    },
    
    watch: {
      css: {
        files: ['css/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['images/site/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'imagemin', 'watch']);
};
