const assert=require('chai').assert;
const Scout=require('../../src/models/scout.js');

describe('Scout',()=>{
  it('should return instance of Scout',()=>{
    let scout = new Scout();
    let expected = {id:'2',name:'Scout',rank:2};
    let actual = scout;
    assert.deepEqual(expected,actual);
  });
});

