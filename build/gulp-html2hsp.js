var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports = function() {

    function processHspFile(file, enc, cb){

        if(file.isStream()){
            this.emit('error', new PluginError('gulp-html2hsp', 'Streaming not supported'));
            return cb();
        }

        if(file.isBuffer()){
            try {
                var content = String(file.contents);
                content = "{export template description()}\r\n" + content + "\r\n{/template}";
                file.contents = new Buffer(content);
                file.path = gutil.replaceExtension(file.path, ".hsp");
            } catch(e) {
                this.emit('error', e);
            }
        }

        this.push(file);
        cb();
    }

    return through.obj(processHspFile);
};
