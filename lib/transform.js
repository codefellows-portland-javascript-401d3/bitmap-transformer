const fs = require('fs');
const invert = require('./invert');
const save = require('./save');

module.exports = function transform(file) {
  fs.readFile(file, function (err, incomingBuffer) {
    if (err) return console.error( 'ERROR: ' + err);
    const buffer = incomingBuffer;
    const palette = [];
    const bitmap = {};

    bitmap.offset = buffer.readUInt32LE(10);
    console.log(bitmap.offset);
//
// TODO: Check this calculation for grabbing the palette
//
    bitmap.readPalette = (function() {
      let counter = 0;
      for (let i = 54; i < bitmap.offset ; i+=4) {
        palette[counter++] = [buffer.readUInt8(i), buffer.readUInt8(i+1), buffer.readUInt8(i+2), 0];
      }
      //console.log('original palette');
      //console.log(palette);
    })(); // immediately invoked with the IIFE
    // pallet.length * 4 becuase RGBA, each palette index will have all four values in it (palette.length * 4 = offset - 54)
    if (palette.length * 4 === bitmap.offset - 54) {
      invert(palette);

      var stringifiedInvertedPalette = palette.toString();
      console.log('invert pal', stringifiedInvertedPalette);
      var stringBuffer = buffer.toString();
      var paletteToReplace = stringBuffer.substring(54, 1078);
      stringBuffer.replace(paletteToReplace, stringifiedInvertedPalette);
      //console.log(stringBuffer);
      buffer.write(stringBuffer, 54, palette.length, 'ascii');
      save('./img/temp/invertedBitmap.bmp', buffer);
    }
    else {
      console.log('ERROR: quantities aren\'t matching up');
    }
  });
};
