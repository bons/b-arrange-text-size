module.exports = function(grunt)
{  
  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:dist', 'browserify', 'uglify']);
}
