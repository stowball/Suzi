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
          'css/site/all.css': 'css/src/all.scss',
          'css/site/ltie9.css': 'css/src/ltie9.scss'
        }
      }
    },
    
    concat: {
      base: {
        src: [
          'js/cssua.min.js',
          'js/modernizr.min.js',
          'js/supports.touch.min.js',
          'js/izilla.gup.min.js',
          'js/layout.engine.min.js',
          'js/mq.genie.min.js'
        ],
        dest: 'js/build/base.js'
      },
      all: {
        src: [
          'js/class.query.min.js',
          'js/jquery.rwdImages.min.js',
          'js/swipe.min.js',
          'js/firefox.hwa.min.js',
          'js/fastclick.min.js',
          'js/site/all.js'
        ],
        dest: 'js/build/all.js'
      }
    },
    
    uglify: {
      base: {
        src: 'js/build/base.js',
        dest: 'js/build/base.min.js'
      },
      all: {
        src: 'js/build/all.js',
        dest: 'js/build/all.min.js'
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