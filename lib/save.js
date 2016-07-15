const fs = require('fs');

module.exports = function save (fileDestination, incomingBuffer) {
  console.log(fileDestination);
  fs.writeFile(fileDestination, incomingBuffer, (err)=> {
    if (err) return console.error('ERROR: ' + err);
    console.log('it wrote the file');
  });
};
