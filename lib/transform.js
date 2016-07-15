const read = require('./read');
const write = require('./write');
const fs = require('fs');

exports = module.exports;

exports.colorShift = function(arr, color, num) {
  var index;
  if(color == 'red') index = 0;
  if(color == 'green') index = 1;
  if(color == 'blue') index = 2;
  arr.map(function(element) {
    element[index] += num;
    if(element[index] > 255) element[index] = 255;
  });
  return arr;
};