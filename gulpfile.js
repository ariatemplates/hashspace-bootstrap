var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var markdown = require('gulp-markdown');
var hsp = require('gulp-hashspace');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var html2hsp = require('./build/gulp-html2hsp');
var removehtmlcommenttags = require('./build/gulp-removehtmlcommenttags');
var http = require('http');
var karma = require('karma').server;
var connect = require('connect');
var _ = require('lodash');


require('gulp-grunt')(gulp);
var wwwServerPort = 8080;
var _destFolder = "target";
var _devFolder = _destFolder + "/dev";
var _prodFolder = _destFolder + "/prod";

var karmaCommonConf = {
    browsers: ['Chrome'],
    files: [
        'src/**/*.hsp',
        'src/**/*.js',
        'test/**/*.spec.js',
        './node_modules/hashspace/hsp/*.js',
        './node_modules/hashspace/hsp/rt/**/*.js',
        './node_modules/hashspace/hsp/gestures/**/*.js'
    ],
    frameworks: ['mocha', 'chai', 'commonjs'],
    preprocessors: {
        'src/**/*.hsp': ['hsp-compile', 'commonjs'],
        'src/**/*.js': ['hsp-transpile', 'commonjs'],
        'test/**/*.spec.js': ['commonjs'],
        './node_modules/hashspace/hsp/**/*.js': ['commonjs']
    },
    commonjsPreprocessor: {
        modulesRoot: './node_modules/hashspace'
    }
};

gulp.task('checkstyle', function() {
    return gulp.src(['src/**/*.js', 'demo/**/*.js', 'test/**/*.js', 'build/**/*.js']).pipe(jshint()).pipe(jshint.reporter("default")).pipe(jshint.reporter("fail"));
});

gulp.task('clean', ['checkstyle'], function(){
    return gulp.src(_destFolder, {read: false}).pipe(clean());
});

gulp.task('build', ['clean'], function() {
    gulp.src(['demo/**/*.html', 'demo/**/*.css']).pipe(gulp.dest(_devFolder));
    gulp.src('demo/**/*.md').pipe(markdown()).pipe(html2hsp()).pipe(hsp.compile()).pipe(gulp.dest(_devFolder + '/demo'));
    gulp.src('demo/**/*.hsp').pipe(hsp.compile()).pipe(gulp.dest(_devFolder + '/demo'));
    gulp.src('demo/**/*.js').pipe(hsp.transpile()).pipe(gulp.dest(_devFolder + '/demo'));
    gulp.src('src/**/*.hsp').pipe(hsp.compile()).pipe(gulp.dest(_devFolder));
    gulp.src('src/**/*.js').pipe(hsp.transpile()).pipe(gulp.dest(_devFolder));
});

gulp.task('test', ['checkstyle'], function (done) {
    return karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('play', ['clean'], function () {
    watch({glob: ['demo/**/*.html', 'demo/**/*.css']}, function (files) {
        files.pipe(gulp.dest(_devFolder));
    });
    watch({glob: 'demo/**/*.md'}, function (files) {
        files.pipe(markdown().on('error', gutil.log)).pipe(html2hsp()).pipe(hsp.compile()).pipe(gulp.dest(_devFolder + '/demo'));
    });
    watch({glob: 'demo/**/*.hsp'}, function (files) {
        files.pipe(hsp.compile().on('error', gutil.log)).pipe(gulp.dest(_devFolder + '/demo'));
    });
    watch({glob: 'src/**/*.hsp'}, function (files) {
        files.pipe(hsp.compile().on('error', gutil.log)).pipe(gulp.dest(_devFolder));
    });
    watch({glob: 'src/**/*.js'}, function (files) {
        files.pipe(hsp.transpile().on('error', gutil.log)).pipe(gulp.dest(_devFolder));
    });

    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    http.createServer(connect().use(connect.static('./' + _devFolder))).listen(wwwServerPort);
});

gulp.task('tdd', function (done) {
    karma.start(_.assign({}, karmaCommonConf), done);
});

gulp.task('package', ['build', 'grunt-package'], function() {
    gulp.src([_devFolder + '/**/*.html', _devFolder + '/**/*.css']).pipe(removehtmlcommenttags()).pipe(gulp.dest(_prodFolder));
    gulp.src(_prodFolder + '/*.js').pipe(uglify()).pipe(gulp.dest(_prodFolder));
})

gulp.task('www', ['package'], function() {
    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    http.createServer(connect().use(connect.static('./' + _prodFolder))).listen(wwwServerPort);
});

gulp.task('default', ['package']);
