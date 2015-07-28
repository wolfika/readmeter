module.exports = exports = function(grunt) {

  require('grunt-task-loader')(grunt, {
    mapping: {
      mochacov: 'grunt-mocha-cov'
    }
  });
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },

    mochacov: {
      all: ['test/**/*.js'],
      coverage: {
        options: {
          coveralls: true,
          reporter: 'html-cov'
        }
      },
      test: {
        options: {
          reporter: 'spec'
        }
      }
    }
  });

  grunt.registerTask('coverage', ['mochacov:coverage']);
  grunt.registerTask('test', ['mochacov:test']);
  grunt.registerTask('ci', ['test', 'coverage']);

  grunt.registerTask('default', ['jshint', 'test']);

};
