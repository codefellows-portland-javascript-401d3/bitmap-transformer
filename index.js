const fs = require( 'fs' );

function getBufferHeader(){

  fs.readFile('./palette-bitmap.bmp', (err, buffer) => {
    if (err) return console.error(err);
    const offset = buffer.readInt16LE(10);
    const numColorsInPalette = buffer.readInt16LE(46);
    console.log(offset);
    console.log(numColorsInPalette);
  });

}

getBufferHeader();

//buffer = entire file
//offset = start of the header
//num of colors in palette //we just need to find rgb
//4bits per color RGBA
//ends at 1094
//functions take in dword => alter and bring dword back //dword
