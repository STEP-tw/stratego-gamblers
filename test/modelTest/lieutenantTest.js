const assert=require('chai').assert;
const Lieutenant=require('../../src/models/lieutenant.js');

describe('Lieutenant',()=>{
  it('should return instance of Lieutenant',()=>{
    let lieutenant = new Lieutenant();
    let expected = {id:'5',name:'Lieutenant',rank:5};
    let actual = lieutenant;
    assert.deepEqual(expected,actual);
  });
});

