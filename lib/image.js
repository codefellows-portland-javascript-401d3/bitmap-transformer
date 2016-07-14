const fs = require('fs');
const buffer = require('buffer');

exports = module.exports;

let imageBuffer;
exports.headers = {};

exports.load = (path,callback) => {
  fs.readFile(path, (err,data) => {
    if (err) return callback(err);
    imageBuffer = Buffer.from(data);
    exports.headers['header'] = imageBuffer.toString('utf8',0,2);
    exports.headers['size'] = imageBuffer.readInt32LE(2);
    exports.headers['offset'] = imageBuffer.readInt32LE(10);
    exports.pixelArray = imageBuffer.slice(exports.headers.offset);

    callback(imageBuffer);
  });
};
