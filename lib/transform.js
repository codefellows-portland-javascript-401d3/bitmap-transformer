const fs = require('fs');
const blueShift = require('./blueShift');
const save = require('./save');

module.exports = function transform(file) {
  fs.readFile(file, function (err, incomingBuffer) {
    if (err) return console.error( 'ERROR: ' + err);
    const buffer = incomingBuffer;
    console.log('start', buffer);
    const palette = [];
    const bitmap = {};

    bitmap.offset = buffer.readUInt32LE(10);
    bitmap.readPalette = (function() {
      let counter = 0;
      // blue, green, red, alpha
      for (let i = 54; i < bitmap.offset ; i+=4) {
        palette[counter++] = [buffer.readUInt8(i), buffer.readUInt8(i+1), buffer.readUInt8(i+2), buffer.readUInt8(i+3)];
      }
    })();
    if (palette.length * 4 === bitmap.offset - 54) {
      blueShift(palette);
      var stringifiedInvertedPalette = palette.toString();
      var stringBuffer = buffer.toString();
      var paletteToReplace = stringBuffer.substring(54, 1078);
      stringBuffer.replace(paletteToReplace, stringifiedInvertedPalette);
      buffer.write(stringBuffer, 54, palette.length, 'ascii');
      console.log('after', buffer);
      save('./img/temp/invertedBitmap.bmp', buffer);
    }
    else {
      console.log('ERROR: quantities aren\'t matching up');
    }
  });
};
