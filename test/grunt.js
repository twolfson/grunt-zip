module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: require('../package.json'),
    zip: {
      single: {
        src: ['test_files/file.js'],
        dest: 'actual/single_zip/file.zip'
      },
      multi: {
        src: ['test_files/file.js', 'test_files/file2.js'],
        dest: 'actual/multi_zip/file.zip'
      },
      nested: {
        // I think I already see the problem -- misuse of **
        // src: 'test_files/nested/**',
        src: 'test_files/nested/**/*',
        dest: 'actual/nested_zip/file.zip'
      }
    },
    unzip: {
      simple: {
        src: 'test_files/file.zip',
        dest: 'actual/unzip'
      },
      nested: {
        src: 'test_files/nested.zip',
        dest: 'actual/nested'
      }
    },
    test: {
      common: 'zip_test.js'
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // grunt.registerTask('pkg.name', 'aaa', function () {

  //   console.log(this, arguments);
  // });

  // Run project task then tests.
  // grunt.registerTask('default', 'zip unzip test');
  grunt.registerTask('default', 'zip:nested');
};