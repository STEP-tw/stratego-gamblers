const assert=require('chai').assert;
const Major=require('../../src/models/major.js');

describe('Major',()=>{
  it('should return instance of Major',()=>{
    let major = new Major();
    let expected = {id:'7',name:'Major',rank:7};
    let actual = major;
    assert.deepEqual(expected,actual);
  });
});

