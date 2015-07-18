module.exports = exports = function(grunt) {

  require('grunt-task-loader')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },

    clean: {
      coverage: {
        src: ['lib-cov/']
      },
      reports: {
        src: ['reports/']
      }
    },

    copy: {
      test: {
        src: ['test/**/*'],
        dest: 'lib-cov/'
      }
    },

    blanket: {
      test: {
        src: ['src/**/*'],
        dest: 'lib-cov/src'
      }
    },

    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec',
          timeout: 10000
        },
        src: ['lib-cov/test/**/*.js']
      },
      'html-cov': {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'reports/coverage.html'
        },
        src: ['lib-cov/test/**/*.js']
      },
      'mocha-lcov-reporter': {
        options: {
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'reports/lcov.info'
        },
        src: ['lib-cov/test/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['lib-cov/test/**/*.js']
      }
    },

    coveralls: {
      options: {
        force: true
      },
      all: {
        src: 'reports/lcov.info'
      }
    }
  });

  grunt.registerTask('build', ['clean', 'blanket', 'copy']);
  grunt.registerTask('ci', ['default', 'coveralls']);

  grunt.registerTask('default', ['jshint', 'build', 'mochaTest']);

};
