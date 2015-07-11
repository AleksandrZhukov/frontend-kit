'use strict';

// Include Gulp & Load plugins
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    merge = require('merge-stream');


// Styles
var postcssPlugins = [
  require('postcss-import')({
    path: ["app/styles"]
  }),
  require('postcss-calc'),
  require('postcss-discard-comments'),
  require('autoprefixer-core')('last 10 versions'),
  require('postcss-nested'),
  require('postcss-simple-vars')
];

gulp.task('style', function () {
  gulp.src('./app/styles/**/*.css')
    .pipe(plugins.postcss(postcssPlugins))
    .pipe(plugins.wrap('/*<%= file.path %>*/\n<%= contents %>'))
    .pipe(plugins.concat('styles.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(plugins.size({title: 'css'}));
});

// HTMLs
gulp.task('jade', function () {
  return gulp.src('app/**/*.jade')
    .pipe(plugins.jade({pretty: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.size({title: 'jade'}));
});

// Start server
gulp.task('server', ['default'], function () {
  browserSync({
    notify: false,
    server: 'dist'
  });
});

// Main task
gulp.task('default', ['clean'], function () {
  gulp.src(['bower_components/**/*']).pipe(gulp.dest('dist/bower_components'));
  gulp.run('style', 'jade');

// Watchers
  gulp.watch(['./app/styles/**'], ['style', reload]);
  gulp.watch(['./app/**/*.jade'], ['jade', reload]);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist/*']));
