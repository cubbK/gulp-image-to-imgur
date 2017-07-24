const Transform = require('stream').Transform;
const PluginError = require('gulp-util').PluginError;
const replace = require('stream-buffer-replace');

const PLUGIN_NAME = 'gulp-image-to-imgur';

module.exports = function(opts) {
    const stream = new Transform({ objectMode: true });


    stream._transform = function(file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        if (file.isBuffer()) {
            const replacer = replace(new Buffer('YOLO'), new Buffer('HI'))
                //file.pipe(replacer);
            console.log(file.contents.toString())
            cb(null, file);
        }
    };
    return stream;
};