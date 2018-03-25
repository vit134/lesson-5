/*eslint no-console: 0*/
'use strict';

const gulp = require('gulp'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	cleanCSS = require('gulp-clean-css'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	babel = require('gulp-babel'),
	prefixer = require('gulp-autoprefixer');

const ENV = require('gulp-environments'),
	development = ENV.development();

const path = {
	build: {
		styles: 'dist/styles',
		scripts: 'dist/scripts'
	},
	dev: {
		blocks: 'client/blocks/**/',
		pages: 'client/pages/*.js'
	}
};

gulp.task('styles', function () {
	return gulp.src([
		path.dev.blocks + '*.less'
	])
		.pipe(concat('_main.less'))
		.pipe(less())
		.pipe(prefixer())
		.on('error', console.log)
		.pipe(gulpif(!development, cleanCSS()))
		.pipe(gulp.dest(path.build.styles));
});

gulp.task('scripts', function () {

	return gulp.src([
		path.dev.pages
	])
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(browserify({
			insertGlobals: true
		}))
		/*.pipe(gulpif(!development, uglify().on('error', function (e) {
			console.log(e);
		})))*/
		.pipe(gulp.dest(path.build.scripts));
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('watch', function () {
	watch([path.dev.blocks + '*.less'], function () {
		gulp.start('styles');
	});

	watch([
		path.dev.blocks + '*.js',
		path.dev.pages
	], function () {
		gulp.start('scripts');
	});
});
