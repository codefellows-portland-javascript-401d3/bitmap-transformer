const fs = require('fs');

module.exports = function save (fileDestination, incomingBuffer, callback) {
  fs.writeFile(fileDestination, incomingBuffer, (err) => {
    if (err) return console.error('ERROR: ' + err);
  });
  callback();
};
