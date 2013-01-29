module.exports = function(grunt) {
  "use strict";

  // grunt plugins
  grunt.loadNpmTasks( "grunt-contrib-jshint" );

	// Project configuration.
  grunt.config.init({
    watch: {
      files: '<config:jshint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      files: {
        src: ['Gruntfile.js', 'tasks/**/*.js']
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'jshint');

};
