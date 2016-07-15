const transform = require('./lib/transform');
//const invert = require('./lib/invert');
//const write = require('./lib/write');
// const grayscale = require('./lib/grayscale');

function invertIt () {
  transform('./img/palette-bitmap.bmp');
}
invertIt();

// function grayscaleIt () {
//   transform('./img/palette-bitmap.bmp', grayscale);
// }
// grayscaleIt();
