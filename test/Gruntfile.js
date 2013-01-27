module.exports = function (grunt) {

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Project configuration.
  grunt.config.init({
    zip: {
      single: {
        src: ['test_files/file.js'],
        dest: 'actual/single_zip/file.zip'
      },
      multi: {
        src: ['test_files/file.js', 'test_files/file2.js'],
        dest: 'actual/multi_zip/file.zip'
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
      all: '*_test.js'
    }
  });

  // Run project task then tests.
  grunt.registerTask('default', 'zip unzip test');
};