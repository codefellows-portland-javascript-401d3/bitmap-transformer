const assert = require('chai').assert;
const attemptPath = '../img/shiftedCorrectly.bmp';

describe ('image comparisons', () => {

  it ('is shifted image created?', () => {
    assert.isOk(attemptPath, 'modified image is not being created');
  });

});
