'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const express = require('express');

const build_dir = "build";

gulp.task('build-components-templates', function() {
  console.log('# Builds components templates #');
  return gulp.src('src/app/**/*.html', {base: 'src/'})
      .pipe(gulp.dest(build_dir));
});

gulp.task('build-js', function() {
  console.log('# Builds JS files #');
  var dest_filename = 'magic-stats-ui.min.js';

  return gulp.src('src/app/**/*.js')
    .pipe(concat(dest_filename))
    .pipe(gulp.dest(build_dir));
});

gulp.task('build-sass', function() {
  console.log('# Builds SASS files #');
  var dest_filename = 'magic-stats-ui.min.css';

  return gulp.src('src/app/**/*.scss')
    .pipe(concat(dest_filename))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(build_dir));
});

gulp.task('build', ['build-components-templates', 'build-js', 'build-sass'], function() {
  console.log('# Build complete ! #');
});

gulp.task('serve', function() {
  var server = express();

  server.use(express.static(__dirname + '/src'));
  server.listen(8083);
  console.log('# Seving on localhost:8083 #');
});

gulp.task('default', ['build', 'serve'], function() {
  gulp.watch('src/app/components/**/*.html', ['build-components-templates']);
  gulp.watch('src/app/**/*.js', ['build-js']);
  gulp.watch('src/style/**/*.scss', ['build-sass']);
  gulp.watch('src/index.html', ['build']);
  console.log("# READY #");
});