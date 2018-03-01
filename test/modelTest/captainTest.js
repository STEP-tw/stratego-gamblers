const assert=require('chai').assert;
const Captain=require('../../src/models/captain.js');

describe('Captain',()=>{
  it('should return instance of Captain',()=>{
    let captain = new Captain();
    let expected = {id:'6',name:'Captain',rank:6};
    let actual = captain;
    assert.deepEqual(expected,actual);
  });
});

