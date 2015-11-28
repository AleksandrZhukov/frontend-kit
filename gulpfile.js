'use strict';

// Include Gulp & Load plugins
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    merge = require('merge-stream'),
    browserify = require('browserify'),
    reactify = require('reactify'),
   browserify = require("browserify"),
    source = require("vinyl-source-stream");


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

// JS
gulp.task('js', function () {
  return gulp.src('app/**/*.js')
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.size({title: 'js'}));
});

gulp.task('jsx', function () {var browserify = require("browserify");
  return gulp.src('app/**/*.jsx')
    .pipe(plugins.react())
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.size({title: 'jsx'}));
});

gulp.task('scripts', function () {
  return gulp.src('app/js/app.js')
    .pipe(browserify({
      transform: [reactify]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.transform("babelify", {presets: ["es2015", "react"]});
  b.add('app/js/app.js');
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/'));
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
  gulp.run('style', 'jade', 'browserify');

// Watchers
  gulp.watch(['./app/styles/**'], ['style', reload]);
  gulp.watch(['./app/**/*.jade'], ['jade', reload]);
  gulp.watch(['./app/**/*.jsx'], ['browserify', reload]);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist/*']));
