module.exports = function invert (palette) {
  for (let i = 0; i < palette.length - 1; i++) {
    palette[i] = [0xff - palette[i][0], 0xff - palette[i][1], 0xff - palette[i][2], 0xff - palette[i][3]];
  }
  // console.log('This is the inverted buffer');
  // console.log(palette);
  //console.log('done');
  return palette;// this shit is now inverted, mutha fucka!
  //TODO add callback function and pass the pallette into the CB
  //Need to create the file and push that inverted palette into the new file/save
};
