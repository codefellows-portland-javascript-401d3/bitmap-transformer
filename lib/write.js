const fs = require('fs');
const path = require('path');
const read = require('./read');

exports.buff = function(path, callback) {
  read.get(path, (err, data) => {
    buffedData = Buffer.from(data);
    callback(err, buffedData);
  });
};