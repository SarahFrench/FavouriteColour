var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('hello', function() {
  return new Promise(function(resolve, reject) {
    console.log("Hello");
    resolve();
  });
});

gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('../public'))
      .pipe(gulp.dest('public'))
      .pipe(gulp.dest('src'))
});

gulp.task('watch', function() {
  gulp.watch('src/index.scss', gulp.series('sass'));
})
