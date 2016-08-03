const assert = require('chai').assert;
const fs = require('fs');
const image = require('../lib/image.js');
const path = require('path');

const imagePath = 'non-palette-bitmap.bmp';
const newPath = 'new-non-palette-image.bmp';

describe('test image library against non-palette BMP', () => {

  it('opens a file and reads it into a buffer', done => {
    image.load(imagePath, (err,result) => {
      assert.ok(!err);
      assert.ok(result);
      done();
    });
  });

  it('converts buffer headers into an object', () => {
    assert.ok(Object.keys(image.headers).length);
  });

  it('runs a transform on the buffer', done => {
    let origBuffer = Buffer.from(image.pixelArray);
    image.transform();
    assert.notDeepEqual(image.pixelArray, origBuffer);
    done();
  });

  it('writes the image buffer to a new file', done => {
    image.write(newPath, (err) => {
      if(err) return done(err);
      fs.readFile(newPath, (err,data) => {
        if (err) return done(err);
        else {
          fs.readFile('pinned.bmp', (err,data2) => {
            if (err) return done(err);
            else {
              assert.deepEqual(data, data2);
              done();
            };
          });
        };
      });
    });
  });
});

const imagePath2 = 'palette-bitmap.bmp';
const newPath2 = 'new-palette-image.bmp';

describe('test image library against palette BMP', () => {

  it('opens a file and reads it into a buffer', done => {
    image.load(imagePath2, (err,result) => {
      assert.ok(!err);
      assert.ok(result);
      done();
    });
  });

  it('converts buffer headers into an object', () => {
    assert.ok(Object.keys(image.headers).length);
  });

  it('runs a transform on the buffer', done => {
    let origBuffer = Buffer.from(image.pixelArray);
    image.transform('palette');
    assert.notDeepEqual(image.pixelArray, origBuffer);
    done();
  });

  it('writes the image buffer to a new file', done => {
    image.write(newPath2, (err) => {
      fs.readFile(newPath2, (err,data) => {
        if (err) return done(err);
        else {
          fs.readFile('pinned-palette.bmp', (err,data2) => {
            if (err) return done(err);
            else {
              assert.deepEqual(data, data2);
              done();
            };
          });
        };
      });
    });
  });
});
