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
var karmaConf = require('./build/karma.conf');

var wwwServerPort = 8080;
var _destFolder = "target";
var _devFolder = _destFolder + "/dev";
var _prodFolder = _destFolder + "/prod";
var hspVersion = require('hashspace/package.json').version;
var noderVersion = require('gulp-noder/node_modules/noder-js/package.json').version;
var packages = ['hashspace-bootstrap', 'hashspace-bootstrap-demo'];

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
    return gulp.src(['src/**/*.js', 'demo/**/*.js', 'test/**/*.js', '!demo/lib/**/*.*']).pipe(jshint()).pipe(jshint.reporter("default")).pipe(jshint.reporter("fail"));
});

gulp.task('clean', ['checkstyle'], function(){
    return gulp.src(_destFolder, {read: false}).pipe(clean());
});

gulp.task('build', ['clean'], function() {
    gulp.src('demo/**/*.+(html)').pipe(template({hspVersion: hspVersion, noderVersion: noderVersion, packages: []})).pipe(gulp.dest(_devFolder));
    gulp.src('demo/**/*.md').pipe(markdown()).pipe(html2hsp()).pipe(hsp.compile()).pipe(gulp.dest(_devFolder));
    gulp.src('demo/samples/**/*.+(hsp|js)').pipe(hsp.process()).pipe(gulp.dest(_devFolder + '/samples'));
    gulp.src('demo/+(css|lib)/**/*.*').pipe(gulp.dest(_devFolder));
    return gulp.src('src/**/*.+(hsp|js)').pipe(hsp.process()).pipe(gulp.dest(_devFolder));
});

gulp.task('test', ['checkstyle'], function (done) {
    karma.start(_.assign({}, karmaConf.common, karmaConf.test), done);
});

gulp.task('play', ['clean'], function () {
    watch({glob: 'demo/**/*.+(html)'}, function (files) {
        files.pipe(template({hspVersion: hspVersion, noderVersion: noderVersion, packages: []})).pipe(gulp.dest(_devFolder));
    });
    watch({glob: 'demo/**/*.md'}, function (files) {
        files.pipe(markdown().on('error', gutil.log)).pipe(html2hsp()).pipe(hsp.compile()).pipe(gulp.dest(_devFolder ));
    });
    watch({glob: 'demo/samples/**/*.+(hsp|js)'}, function (files) {
        files.pipe(hsp.compile().on('error', gutil.log)).pipe(gulp.dest(_devFolder + '/samples'));
    });
    watch({glob: 'demo/+(css|lib)/**/*.*'}, function (files) {
        files.pipe(gulp.dest(_devFolder));
    });
    watch({glob: 'src/**/*.+(hsp|js)'}, function (files) {
        files.pipe(hsp.process().on('error', gutil.log)).pipe(gulp.dest(_devFolder));
    });

    startWWWServer(_devFolder);
});

gulp.task('tdd', function (done) {
    karma.start(_.assign({}, karmaConf.common), done);
});

gulp.task('package', ['build'], function() {
    gulp.src(['demo/**/*.+(html)'])
        .pipe(template({hspVersion: hspVersion, noderVersion: noderVersion, packages: packages})).pipe(gulp.dest(_prodFolder));
    gulp.src('demo/+(css|lib)/**/*.*').pipe(gulp.dest(_prodFolder));

    gulp.src([_devFolder + '/**/*.+(hsp|js)', '!' + _devFolder+ '/samples/**/*.*', '!' + _devFolder+ '/lib/**/*.*'])
        .pipe(noder.package('/' + _devFolder))
        .pipe(concat('hashspace-bootstrap.js')).pipe(noder.wrap())
        .pipe(uglify())
        .pipe(gulp.dest(_prodFolder));
    gulp.src([_devFolder + '/samples/**/*.+(hsp|js)'])
        .pipe(noder.package('/' + _devFolder))
        .pipe(concat('hashspace-bootstrap-demo.js')).pipe(noder.wrap())
        .pipe(uglify())
        .pipe(gulp.dest(_prodFolder));
});

gulp.task('www', ['package'], function() {
    startWWWServer(_prodFolder);
});

gulp.task('ci1', ['test'], function (done) {
    karma.start(_.assign({}, karmaConf.common, karmaConf.ci1), done);
});
gulp.task('ci2', ['ci1'], function (done) {
    karma.start(_.assign({}, karmaConf.common, karmaConf.ci2), done);
});
gulp.task('ci', ['ci2'], function () {
    //TODO: remove process.exit() here
    process.exit();
});

gulp.task('sauce', ['checkstyle'], function (done) {
    return karma.start(_.assign({}, karmaConf.common, karmaConf.sauce), done);
});

gulp.task('default', ['package']);
