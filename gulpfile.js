var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    jade = require('gulp-jade'),
    compass = require('gulp-compass');

var basePath = {
    app  : 'app/',
    dist : 'dist/'
};

var appPaths = {
    css     : basePath.app + 'css/',
    js      : basePath.app + 'js/',
    jade    : basePath.app + 'jade/',
    html    : basePath.app + 'html/',
    img     : basePath.app + 'img/',
    fonts   : basePath.app + 'fonts/',
    phpCore : basePath.app + 'php-core/',
    scss    : basePath.app + 'scss/'
};

var distPaths = {
    css     : basePath.dist + 'css/',
    js      : basePath.dist + 'js/',
    img     : basePath.dist + 'img/',
    fonts   : basePath.dist + 'fonts/',
    phpCore : basePath.dist + 'php-core/'
};

/* --------------- BUILD TASKS --------------- */

gulp.task('buildApp', ['buildHTML', 'buildCss', 'buildJs']);

gulp.task('cleanBuildDir', function (cb) {
    del([basePath.dist], cb);
});

gulp.task('buildHTML', ['cleanBuildDir'], function() {
    gulp.src(appPaths.jade +'*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(basePath.dist));
});

gulp.task('buildCss', ['buildHTML'], function() {
    return gulp.src([appPaths.css + '**'])
        .pipe(size({showFiles: true}))
        .pipe(concat('ui.css'))
        .pipe(size({title: 'Concatenated Css'}))
        .pipe(size({title: 'uncss'}))
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(size({title: 'Minified Css'}))
        .pipe(gulp.dest(distPaths.css));
});

gulp.task('buildJs', ['buildCss'], function() {
    return gulp.src([
        appPaths.js + 'libs/**',
        appPaths.js + 'app.js',
        '!' + appPaths.js + 'libs/{html5js,html5js/**}'
    ])
        .pipe(concat('ui.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(size())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('riba', function() {
    console.log('riba');
});


gulp.task('default', ['riba']);