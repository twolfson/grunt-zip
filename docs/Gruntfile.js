module.exports = function (grunt) {
  // Define a zip
  grunt.initConfig({
    zip: {
      'location/to/zip/to.zip': ['file/to/zip.js', 'another/file.css']
    },
    unzip: {
      'location/to/extract/to/': 'file/to/extract.zip'
    }
  });

  // Load in `grunt-zip`
  grunt.loadTasks('../tasks');
};
