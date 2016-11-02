"use strict";

const gulp = require("gulp"),
  del = require("del"),
  tsc = require("gulp-typescript"),
  sourcemaps = require('gulp-sourcemaps'),
  tslint = require('gulp-tslint'),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence'),
  nodemon = require('gulp-nodemon'),
  uglify = require('gulp-uglify'),
  strip = require('gulp-strip-comments');

/**
 * clean dist server
 */
gulp.task('clean', function(cb) {
  return del(["dist/server"], cb);
});

/**
 * Build Express server
 */
gulp.task('build:server', function () {
  var tsProject = tsc.createProject('server/tsconfig.json');
  var tsResult = gulp.src('server/src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/server'));
});


/**
 * Copy bin directory for www
 */
gulp.task("serverResources", function () {
  return gulp.src(["server/src/bin/**"])
    .pipe(gulp.dest("dist/server/bin"));
});


gulp.task("ENV", function () {
  return gulp.src([
    './server/process.*.env'
  ]).pipe(gulp.dest("dist/server"));
});


/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 3. Build the Angular app
 * 4. Copy the resources
 * 5. Copy the dependencies.
 */

gulp.task("build", function (callback) {
  runSequence('build:server', 'serverResources', 'ENV', callback);
});

gulp.task('default', function (callback) {
  runSequence('clean','build:server', 'serverResources', 'ENV', callback);
});
