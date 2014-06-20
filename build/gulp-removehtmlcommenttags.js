var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports = function() {

    function processHspFile(file, enc, cb){

        if(file.isStream()){
            this.emit('error', new PluginError('gulp-removehtmlcommenttags', 'Streaming not supported'));
            return cb();
        }

        if(file.isBuffer()){
            try {
                var content = String(file.contents);
                content = content.replace("<!--", "").replace("-->", "");
                file.contents = new Buffer(content);
            } catch(e) {
                this.emit('error', e);
            }
        }
        this.push(file);
        cb();
    }

    return through.obj(processHspFile);
};
