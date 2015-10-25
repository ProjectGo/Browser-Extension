"use strict";

var fs = require('fs');
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var lint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var crx = require('gulp-crx');

var config = {
	paths: {
		build: './build',
		root: './src',
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/img/*',
		style: './src/style/*.css',
		favicon: './src/favicon.ico',
		manifest: './src/manifest.json',
		entries: [
			'background.js',
			'event.js',
			'options.js'
		]
	}
};

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.build));
});

gulp.task('js', function() {
	config.paths.entries.forEach(function (entry) {
		browserify(config.paths.root + '/js/' + entry)
			.transform(babelify)
			.bundle()
			.on('error', console.error.bind(console))
			.pipe(source(entry))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest(config.paths.build + '/js'));
	});
});

gulp.task('style', function() {
	gulp.src(config.paths.style)
		.pipe(gulp.dest(config.paths.build + '/style'));
});

gulp.task('manifest', function() {
	gulp.src(config.paths.manifest)
		.pipe(gulp.dest(config.paths.build));
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.build + '/img'));

    gulp.src(config.paths.favicon)
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({ config: 'eslint.config.json' }))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.style, ['style']);
	gulp.watch(config.paths.js, ['js', 'lint']);
	gulp.watch(config.paths.manifest, ['manifest']);
});

gulp.task('crx', function() {
	return gulp.src('./build')
		.pipe(crx({
			privateKey: fs.readFileSync('./dist/go-app.pem', 'utf8'),
			filename: 'go-app.crx'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['html', 'js', 'style', 'images', 'manifest', 'lint', 'watch']);