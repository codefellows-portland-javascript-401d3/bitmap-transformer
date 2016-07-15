const assert = require('chai').assert;
const fs = require('fs');
const read = require('../lib/read');
const write = require('../lib/write');
const transform = require('../lib/transform');





const testPath = 'palette-bitmap.bmp';

describe('file', () => {
  it('opens using fs', function(done) {
    read.get(testPath, function(err, data) {
      if(err) throw new Error(err);
      console.log(data.length);
      done();
    });
  });

  it('can be read into a buffer', function(done) {
    write.buff(testPath, function(err, data) {
      if(err) throw new Error(err);
      if(typeof data !== 'object') throw new Error('Returned data type: ' + typeof data);
      //console.log(data);
      done();
    });
  });

  it('header data stored in js object', function(done) {
    read.get(testPath, function(err, data) {
      if(err) return done(err);
      const headerObj = write.parseHeaderToJs(data);
      if(typeof headerObj !== 'object') throw new Error('Returned data type: ' + typeof data);
      // console.log(headerObj);
      done();
    });
  });

  it('run transformer on buffer', function(done) {
    read.get(testPath, function(err, data) {
      if(err) return done(err);
      const headerObj = write.parseHeaderToJs(data);
      transform.colorShift(headerObj.colorTableArr, 'blue', 100);
      // console.log(headerObj.colorTableArr);
      done();
    });
  });

  it('write the buffer to a new file', function(done) {

    write.createImg(testPath, 'blue', 200, function(err, data) {
      if(err) done(err);
      done();
    });
  }); 
});

describe('api calls', () => {
  it('invert colors', function() {

  });

  it('gray scale colors', function() {
    
  });

  it('red shift colors', function() {
    
  });
});


//api for inteferfacing with the trandform by the files names
//cli 
//cli to select transformer