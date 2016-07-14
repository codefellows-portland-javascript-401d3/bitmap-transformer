const fs = require( 'fs' );

function getBufferHeader(){

  fs.readFile('./palette-bitmap.bmp', (err, buffer) => {
    if (err) return console.error(err);
    const offset = buffer.readInt16LE(10);
    const numColorsInPalette = buffer.readInt16LE(46);
    console.log(offset);
    console.log(numColorsInPalette);
    console.log(buffer);
  });

}

getBufferHeader();
