const PLUGIN_NAME = 'gulp-image-to-imgur';
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const DOMParser = require('xmldom').DOMParser;
/**
 * This method transform the input string to upper/lower case
 * @param caseType - The transform type upper/lower
 * @param inputString - The input string
 * @returns {string} - The transformed string
 */
function transformText(input) {
    const paths = getPaths(input)
    return input;
};

function getPaths(input) {
    let paths = [];
    const html = new DOMParser().parseFromString(input, 'text/html');
    const images = html.getElementsByTagName('img');
    Array.prototype.forEach.call(images, image => {
        paths.push(image.getAttribute('src'));
    });
    console.log(paths);
}

/**
 * This method is used for transforming the text to the target type.
 * @param caseType
 */
var gulpText = function(caseType) {
    return through.obj(function(file, enc, callback) {
        var isBuffer = false,
            inputString = null,
            result = null,
            outBuffer = null;
        //Empty file and directory not supported
        if (file === null || file.isDirectory()) {
            this.push(file);
            return callback();
        }
        isBuffer = file.isBuffer();
        if (isBuffer) {
            inputString = new String(file.contents);
            result = transformText(inputString);

            outBuffer = new Buffer(result);
            var aFile = new gutil.File(); // gulp expects a vinyl file
            aFile.path = file.path;
            aFile.contents = outBuffer;
            callback(null, aFile); // after everything is done pass the stream 
        } else {
            this.emit('error',
                new PluginError(PLUGIN_NAME,
                    'Only Buffer format is supported'));
            callback();
        }
    });
};
//Export the Method
module.exports = gulpText;