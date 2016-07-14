const assert = require('chai').assert;
const fs = require('fs');
const image = require('../lib/image.js');

const path = 'non-palette-bitmap.bmp';

describe('image library', () => {

  it('opens a file and reads it into a buffer', done => {
    image.load(path, (result) => {
      assert.ok(result)
      done();
    });
  });

  it('converts buffer headers into an object', () => {
    assert.ok(Object.keys(image.headers).length);
    // console.log(image);
  });

  it('runs a transform on the buffer', done => {
    let origBuffer = Buffer.from(image.pixelArray);
    image.transform();
    assert.notDeepEqual(image.pixelArray, origBuffer);
    done();
  });

  it('writes the image buffer to a new file', done => {
    image.write('new-image.bmp', (err) => {
      // console.log(image);

      done();
    });
  });
});

/*
Open file using fs and read it into a buffer
Convert buffer headers data into a Javascript Object
Run a transform on the buffer
Write the buffer to a new file.
*/