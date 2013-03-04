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
        src: 'test_files/nested/**/*',
        dest: 'actual/nested_zip/file.zip'
      },
      image: {
        src: 'test_files/smile.gif',
        dest: 'actual/image_zip/file.zip'
      }
    },
    unzip: {
      single: {
        src: 'test_files/file.zip',
        dest: 'actual/single_unzip'
      },
      nested: {
        src: 'test_files/nested.zip',
        dest: 'actual/nested_unzip'
      },
      'test-zip-nested': {
        src: 'actual/nested_zip/file.zip',
        dest: 'actual/nested_zip/unzip'
      },
      'test-zip-image': {
        src: 'actual/image_zip/file.zip',
        dest: 'actual/image_zip/unzip'
      }
    },
    test: {
      common: 'zip_test.js'
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Run project task then tests.
  grunt.registerTask('default', 'zip unzip test');
  // grunt.registerTask('default', 'zip:nested unzip:nested2');
  // grunt.registerTask('default', 'zip:image unzip:test-zip-image');
};