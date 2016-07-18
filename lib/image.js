const fs = require('fs');
const buffer = require('buffer');

exports = module.exports;

let imageBuffer;
exports.headers = {};

exports.load = (path,callback) => {
  fs.readFile(path, (err,data) => {
    imageBuffer = null;
    exports.headers = {};
    if (err) return callback(err);
    imageBuffer = Buffer.from(data);
    // header code ('BM' for bitmap)
    exports.headers['header'] = imageBuffer.toString('utf8',0,2);
    // total file size
    exports.headers['size'] = imageBuffer.readInt32LE(2);
    // total offset to get to pixel array
    exports.headers['offset'] = imageBuffer.readInt32LE(10);
    // size of dib header 4 bytes
    exports.headers['dibSize'] = imageBuffer.readInt32LE(14);
    // bitmap width
    exports.headers['width'] = imageBuffer.readInt32LE(18);
    // bitmap height
    exports.headers['height'] = imageBuffer.readInt32LE(22);
    // color planes
    exports.headers['planes'] = imageBuffer.readInt16LE(26);
    // bits per pixel
    exports.headers['bpp'] = imageBuffer.readInt16LE(28);
    // compression method
    exports.headers['compression'] = imageBuffer.readInt32LE(30);
    // image size
    exports.headers['rawSize'] = imageBuffer.readInt32LE(34);
    // horizontal resolution
    exports.headers['horizontalRez'] = imageBuffer.readInt32LE(38);
    // vertical resolution
    exports.headers['verticalRez'] = imageBuffer.readInt32LE(42);
    // colors in color palette
    exports.headers['colorPalette'] = imageBuffer.readInt32LE(46);
    // important colors
    exports.headers['importantColors'] = imageBuffer.readInt32LE(50);
    exports.pixelArray = imageBuffer.slice(exports.headers.offset);

    callback(err,imageBuffer);
  });
};

exports.write = (path,callback) => {
  fs.writeFile(path,imageBuffer, (err) => {
    callback(err);
  });
};

exports.transform = (type) => {
  if(type === 'palette') {
    exports.pixelArray.forEach( (byte,i,arr) => {
      switch (arr[i]) {
        case 0x1c:
          arr[i] = 0x00;
          break;
        case 0x00:
          arr[i] = 0x0f;
          break;
      case 0x0f:
          arr[i] = 0x1c;
          break;
      
        default:
          break;
      }
    });
  } else {
    exports.pixelArray.forEach( (byte,i,arr) => {
      arr[i] = 255 - byte;
    });
  };
};
