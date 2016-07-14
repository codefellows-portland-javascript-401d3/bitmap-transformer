const transform = require('./lib/transform');
const invert = require('./lib/invert');
// const grayscale = require('./lib/grayscale');

function invertIt () {
  transform('./img/palette-bitmap.bmp', invert);
}
invertIt();

// function grayscaleIt () {
//   transform('./img/palette-bitmap.bmp', grayscale);
// }
// grayscaleIt();
