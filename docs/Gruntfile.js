module.exports = function (grunt) {
  // Define a zip
  grunt.initConfig({
    zip: {
      'location/to/zip/to.zip': ['file-to-zip.js', 'another-file.css']
    }
  });

  // Load in `grunt-zip`
  grunt.loadTasks('../tasks');
};
