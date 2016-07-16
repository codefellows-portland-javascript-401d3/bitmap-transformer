const assert = require('chai').assert;
const transform = require('../lib/transform');
const save = require('../lib/save');

describe('returns a file', ()=>{

  it('changes the file and saves', (done)=>{
    transform('./img/palette-bitmap.bmp', save);
    assert.isOk('../img/temp/shiftedBitmap.bmp');
    done();
  });

});
