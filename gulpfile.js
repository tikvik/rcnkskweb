var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var data = require('gulp-data');
var fs = require('fs');

function build() {
  return gulp
    .src('app/templates/*.pug')
    .pipe(
      data(function(file) {
        return JSON.parse(fs.readFileSync('app/data/data.json'));
      })
    )
    .pipe(pug())
    .pipe(gulp.dest('dist/'));
}

function style() {
  return gulp
    .src('app/sass/**/*.sass') // Gets all files ending with .scss in app/scss
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function assets() {
  return gulp.src('app/**/*.{ttf,jpg,svg}').pipe(gulp.dest('./dist'));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  gulp.watch('app/sass/**/*.sass', style);
  gulp.watch('app/templates/**/*.pug', build);
  gulp.watch('app/**/*.pug', build);
  gulp.watch('app/**/*.{ttf,jpg,svg}', assets);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('app/data/**/*.json').on('change', build);
}

exports.build = build;
exports.style = style;
exports.assets = assets;
exports.watch = watch;
