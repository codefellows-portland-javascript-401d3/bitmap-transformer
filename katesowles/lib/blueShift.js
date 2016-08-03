module.exports = function blueShift (palette) {
  for (let i = 0; i < palette.length - 1; i++) {
    palette[i] = [0xff - palette[i][0], 0xff - palette[i][1], 0xff - palette[i][2], 0xff - palette[i][3]];
  }
  return palette;
};
