const fs = require('fs');
const path = require('path');
const read = require('./read');
const transform = require('./transform');

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
  output.offsetInt = output.offset.readUInt32LE();
  output.dibHeader = buffer.readUInt32LE(14);
  output.colorTable = buffer.slice(54, 1078);
  output.colorTableArr = [];
  for(i=0; i < 128; i+=4) {
    var b = output.colorTable.slice(i, i+1).readUInt8(0);
    var g = output.colorTable.slice(i+1, i+2).readUInt8(0);
    var r = output.colorTable.slice(i+2, i+3).readUInt8(0);
    var a = output.colorTable.slice(i+3, i+4).readUInt8(0);
    var rgba = [r, g, b, a];
    output.colorTableArr.push(rgba);
  }
  return output
 };

exports.createImg = function(file, color, num, callback) {
  read.get(file, (err, data) => {
    const headerObj = exports.parseHeaderToJs(data);
    const colorArr = transform.colorShift(headerObj.colorTableArr, color, num);
    var newFileBuffer = Buffer.from(data);
    for(i=0; i < colorArr.length; i++) {
      newFileBuffer.writeUInt8(colorArr[i][2], 54+(i*4));
      newFileBuffer.writeUInt8(colorArr[i][1], 55+(i*4));
      newFileBuffer.writeUInt8(colorArr[i][0], 56+(i*4));
    }
    fs.writeFile('bitmap.bmp', newFileBuffer, callback);
  });
};