const fs = require('fs');

// START HERE

module.exports = function save (fileDestination, incomingBuffer) {
  fs.writeFile(fileDestination, incomingBuffer, function (err) {
    if (err) return console.error('ERROR: ' + err);
  });
};

// TODO : package this information back up into a buffer and resave
