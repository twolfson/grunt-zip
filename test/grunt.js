module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    'zip': {
      all: {
        src: ['test_files/file.js'],
        dest: 'actual/file.js'
      }
    },
    'unzip': {

    },
    test: {
      all: '*_test.js'
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Run project task then tests.
  grunt.registerTask('default', 'zip test');
};