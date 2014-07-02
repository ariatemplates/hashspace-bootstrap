var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var template = require('gulp-template');
var markdown = require('gulp-markdown');
var hsp = require('gulp-hashspace');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var noder = require('gulp-noder');
var http = require('http');
var karma = require('karma').server;
var connect = require('connect');
var _ = require('lodash');
var through2 = require('through2');

var wwwServerPort = 8080;
var _destFolder = "target";
var _devFolder = _destFolder + "/dev";
var _prodFolder = _destFolder + "/prod";
var hspVersion = require('hashspace/package.json').version;
var noderVersion = require('gulp-noder/node_modules/noder-js/package.json').version;
var packages = ['hashspace-bootstrap', 'hashspace-bootstrap-demo'];

var karmaCommonConf = {
    browsers: ['Chrome'],
    files: [
        'src/**/*.+(hsp|js)',
        'test/**/*.spec.*',
        './node_modules/sinon/pkg/sinon-ie.js'
    ],
    frameworks: ['mocha', 'expect', 'hsp', 'commonjs', 'sinon'],
    preprocessors: {
        'src/**/*.hsp': ['hsp-compile', 'commonjs'],
        'src/**/*.js': ['hsp-transpile', 'commonjs'],
        'test/**/*.spec.js': ['commonjs'],
        'test/**/*.spec.hsp': ['hsp-compile', 'commonjs'],
        './node_modules/hashspace/hsp/**/*.js': ['commonjs']
    },
    commonjsPreprocessor: {
        modulesRoot: './node_modules/hashspace'
    }
};

function startWWWServer(folder) {
    gutil.log('Starting WWW server at http://localhost:' + wwwServerPort);
    http.createServer(connect().use(connect.static('./' + folder))).listen(wwwServerPort);
}

function html2hsp() {
    return through2.obj(function(file, encoding, done) {
        var content = "{export template description()}\r\n" + String(file.contents).replace(/<table>/g, '<table class="table table-bordered">') + "\r\n{/template}";
        file.contents = new Buffer(content);
        file.path = gutil.replaceExtension(file.path, ".hsp");
        this.push(file);
        done();
    });
}

gulp.task('checkstyle', function() {
    return gulp.src(['src/**/*.js', 'demo/**/*.js', 'test/**/*.js', 'build/**/*.js']).pipe(jshint()).pipe(jshint.reporter("default")).pipe(jshint.reporter("fail"));
});

gulp.task('clean', ['checkstyle'], function(){
    return gulp.src(_destFolder, {read: false}).pipe(clean());
});

gulp.task('build', ['clean'], function() {
    gulp.src(['demo/**/*.html', 'demo/**/*.css']).pipe(template({hspVersion: hspVersion, noderVersion: noderVersion, packages: []})).pipe(gulp.dest(_devFolder));
    gulp.src('demo/**/*.md').pipe(markdown()).pipe(html2hsp()).pipe(hsp.compile()).pipe(gulp.dest(_devFolder + '/demo'));
    gulp.src('demo/**/*.+(hsp|js)').pipe(hsp.process()).pipe(gulp.dest(_devFolder + '/demo'));
    return gulp.src('src/**/*.+(hsp|js)').pipe(hsp.process()).pipe(gulp.dest(_devFolder));
});

gulp.task('test', ['checkstyle'], function (done) {
    return karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('play', ['clean'], function () {
    watch({glob: 'demo/**/*.+(html|css)'}, function (files) {
        files.pipe(template({hspVersion: hspVersion, noderVersion: noderVersion, packages: []})).pipe(gulp.dest(_devFolder));
    });
    watch({glob: 'demo/**/*.md'}, function (files) {
        files.pipe(markdown().on('error', gutil.log)).pipe(html2hsp()).pipe(hsp.compile()).pipe(gulp.dest(_devFolder + '/demo'));
    });
    watch({glob: 'demo/**/*.+(hsp|js)'}, function (files) {
        files.pipe(hsp.compile().on('error', gutil.log)).pipe(gulp.dest(_devFolder + '/demo'));
    });
    watch({glob: 'src/**/*.+(hsp|js)'}, function (files) {
        files.pipe(hsp.process().on('error', gutil.log)).pipe(gulp.dest(_devFolder));
    });

    startWWWServer(_devFolder);
});

gulp.task('tdd', function (done) {
    karma.start(_.assign({}, karmaCommonConf), done);
});

gulp.task('package', ['build'], function() {
    gulp.src(['demo/**/*.html', 'demo/**/*.css'])
        .pipe(template({hspVersion: hspVersion, noderVersion: noderVersion, packages: packages})).pipe(gulp.dest(_prodFolder));

    gulp.src([_devFolder + '/**/*.+(hsp|js)', '!' + _devFolder+ '/demo/**/*.*'])
        .pipe(noder.package('/' + _devFolder))
        .pipe(concat('hashspace-bootstrap.js')).pipe(noder.wrap())
        .pipe(uglify()).pipe(gulp.dest(_prodFolder));
    gulp.src(_devFolder + '/demo/**/*.+(hsp|js)')
        .pipe(noder.package('/' + _devFolder))
        .pipe(concat('hashspace-bootstrap-demo.js')).pipe(noder.wrap())
        .pipe(uglify()).pipe(gulp.dest(_prodFolder));
});

gulp.task('www', ['package'], function() {
    startWWWServer(_prodFolder);
});

gulp.task('default', ['package']);
