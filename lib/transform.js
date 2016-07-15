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
      //console.log('new palette');
      console.log( palette);
      palette.forEach((el)=>{
        el = el.toString();
      });
      var stringified = palette.toString();
      // var string = palette.toString();
      //console.log(buffer);
      buffer.write(stringified, 54, palette.length);
      //console.log('new buffer');
      //console.log(buffer);
      //convert to buffer
      //feed buffer to wrte/save
      save('./img/temp/invertedBitmap.bmp', buffer);
    }
    else {
      console.log('ERROR: quantities aren\'t matching up');
    }
  });
};
