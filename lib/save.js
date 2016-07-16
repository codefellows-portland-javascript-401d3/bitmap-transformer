const fs = require('fs');

module.exports = function save(buffer){
  var fileDestination = './img/temp/invertedBitmap.bmp';

  fs.writeFile(fileDestination, buffer, (err) => {
    if (err) return err;
  });
  
  console.log('complete');
};
