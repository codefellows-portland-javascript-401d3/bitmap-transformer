const fs = require('fs');
const path = require('path');

exports = module.exports;

exports.get = function(path, callback) {
  fs.readFile(path, (err, data) => {
    callback(err, data);
  });
};
