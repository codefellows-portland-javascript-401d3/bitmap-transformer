module.exports = function invert (palette, callback) {
  for (let i = 0; i < palette.length - 1; i++) {
    palette[i] = [0xff - palette[i][0], 0xff - palette[i][1], 0xff - palette[i][2], 0xff - palette[i][3]];
  }
  callback(palette);  // this shit is now inverted, mutha fucka!
};
