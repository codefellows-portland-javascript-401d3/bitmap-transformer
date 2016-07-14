const fs = require('fs');

module.exports = function transform(file, callback) {
  fs.readFile(file, function (err, incomingBuffer) {
    if (err) return console.error( 'ERROR: ' + err);
    const buffer = incomingBuffer;
    const palette = [];
    const bitmap = {};

    bitmap.offset = buffer.readUInt32LE(10);

    bitmap.readPalette = (function() {
      let counter = 0;
      for (let i = 54; i < bitmap.offset ; i+=4) {
        palette[counter++] = [buffer.readUInt8(i), buffer.readUInt8(i+1), buffer.readUInt8(i+2), 0];
      }
      console.log(palette);
    })(); // immediately invoked with the IIFE
    // pallet.length * 4 becuase RGBA, each palette index will have all four values in it (palette.length * 4 = offset - 54)
    if (palette.length * 4 === bitmap.offset - 54) callback(palette);
    else {
      console.log('ERROR: quantities aren\'t matching up');
    }
  });
};
