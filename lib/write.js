const fs = require('fs');
const path = require('path');
const read = require('./read');

exports.buff = function(path, callback) {
  read.get(path, (err, data) => {
    buffedData = Buffer.from(data);
    callback(err, buffedData);
  });
};

exports.parseHeaderToJs = function(buffer) {
  const output = {};
  output.bmtype = buffer.slice(0,2);
  output.bmsize = buffer.slice(2, 6);
  output.bmres1 = buffer.slice(6, 8);
  output.bmres2 = buffer.slice(8, 10);
  output.offset = buffer.slice(10, 14);
  return output
 };
