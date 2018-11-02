var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src(['file.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

var jshint = require('gulp-jshint');
var gulp   = require('gulp');
 
gulp.task('lint', function() {
  return gulp.src('./app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});