'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', function () {
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/*.js', browserSync.reload);
  gulp.watch('app/*.css', browserSync.reload);
  gulp.watch('app/module/**/*.html', browserSync.reload);
  gulp.watch('app/module/**/*.js', function(){
    runSequence('scripts');
  });
  gulp.watch('app/css/*.css', function () {
    runSequence('csss');
  });
  gulp.watch('app/sass/*.scss', function () {
    runSequence('sass');
  });
  gulp.watch('app/*.xml', browserSync.reload);
});

gulp.task('watchserver', function () {
  gulp.watch('./server.js', function () {
    console.log('Web app run on localhost post 8081!')
    runSequence('server');
  });
});

gulp.task('scripts', function () {
  return gulp.src('./app/module/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('csss', function () {
  return gulp.src('./app/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('server', function () {
  nodemon({
    script: 'server.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
  }).on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', ['watch']);
})

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'scripts', 'sass', 'csss'], 'watch',
    callback
  );
});