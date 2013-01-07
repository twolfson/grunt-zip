module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    'zip': {
      single: {
        src: ['test_files/file.js'],
        dest: 'actual/single_zip/file.zip'
      },
      multi: {
        src: ['test_files/file.js', 'test_files/file2.js'],
        dest: 'actual/multi_zip/file.zip'
      }
    },
    'unzip': {
      all: {
        src: 'test_files/file.zip',
        dest: 'actual/unzip'
      }
    },
    test: {
      all: '*_test.js'
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Run project task then tests.
  grunt.registerTask('default', 'zip unzip test');
};