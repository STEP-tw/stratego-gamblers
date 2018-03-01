const assert=require('chai').assert;
const Colonel=require('../../src/models/colonel.js');

describe('Colonel',()=>{
  it('should return instance of Colonel',()=>{
    let colonel = new Colonel();
    let expected = {id:'8',name:'Colonel',rank:8};
    let actual = colonel;
    assert.deepEqual(expected,actual);
  });
});

