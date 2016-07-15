const transform = require('./transform');

module.exports = function write(palette){

  console.log('write function fired!');
  //console.log(palette);
  console.log(transform);

//   bitmap.offset = buffer.readUInt32LE(10);
//
//   bitmap.readPalette = (function() {
//     let counter = 0;
// for (let i = 54; i < bitmap.offset ; i+=4) {
//   palette[counter++] = [buffer.readUInt8(i), buffer.readUInt8(i+1), buffer.readUInt8(i+2), 0];
// }
//     //console.log(palette);
//   })(); // immediately invoked with the IIFE
//   // pallet.length * 4 becuase RGBA, each palette index will have all four values in it (palette.length * 4 = offset - 54)
//   if (palette.length * 4 === bitmap.offset - 54) callback(palette, callback2);
//   else {
//     console.log('ERROR: quantities aren\'t matching up');
//   }
// });
};
