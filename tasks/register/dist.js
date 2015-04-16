module.exports = function(grunt)
{
  
  grunt.registerTask('build', ['jshint', 'karma:dist', 'browserify', 'uglify']);
}
