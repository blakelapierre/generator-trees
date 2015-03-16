module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    babel: {
      options: {
        sourceMap: true,
        optional: ["runtime"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist'
        }]
      }
    },
    // traceur: {
    //   options: {
    //     modules: 'commonjs',
    //     sourceMaps: true,
    //     includeRuntime: true,
    //     generators: 'parse',
    //     experimental: true
    //   },
    //   src: {
    //     files: [{
    //       expand: true,
    //       cwd: 'src',
    //       src: ['**/*.js'],
    //       dest: 'dist'
    //     }]
    //   }
    // },
    execute: {
      launch: {
        options: {
          nodeargs: ['--harmony']
        },
        src: ['dist/index.js']
      },
      test: {
        options: {
          nodeargs: ['--harmony']
        },
        src: ['dist/tests/index.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          harmony: true,
          require: ['should', 'expect.js'],
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['dist/tests/**/*.js']
      }
    }
  });

  grunt.registerTask('build', function() {
    grunt.task.run('babel:dist');
  });

  grunt.registerTask('default' , '', function() {
    grunt.task.run('babel:dist', 'execute:launch');
  });

  grunt.registerTask('test', function() {
    grunt.task.run('babel:dist', 'mochaTest:test');
  });
};