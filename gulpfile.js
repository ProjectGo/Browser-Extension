"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var lint = require('gulp-eslint');

var config = {
	paths: {
		build: './build',
		root: './src',
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/img/*',
		style: './src/style/*.css',
		favicon: './src/favicon.ico',
		manifest: './src/manifest.json'
	}
};

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.build));
});

gulp.task('js', function() {
	browserify(config.paths.root + '/js/event.js')
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('event.js'))
		.pipe(gulp.dest(config.paths.build + '/js'));

	browserify(config.paths.root + '/js/background.js')
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('background.js'))
		.pipe(gulp.dest(config.paths.build + '/js'));

	gulp.src(config.paths.root + '/js/options.js')
		.pipe(gulp.dest(config.paths.build + '/js'));
});

gulp.task('css', function() {
	gulp.src(config.paths.style)
		.pipe(gulp.dest(config.paths.build + '/css'));
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
	gulp.watch(config.paths.style, ['css']);
	gulp.watch(config.paths.js, ['js'/*, 'lint'*/]);
	gulp.watch(config.paths.manifest, ['manifest']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'manifest', /*'lint',*/ 'watch']);