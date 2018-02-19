const assert=require('chai').assert;
const Marshal=require('../../src/models/marshal.js');

describe('Marshal',()=>{
  it('should return instance of Marshal',()=>{
    let marshal = new Marshal();
    let expected = {id:'10',name:'Marshal',rank:10};
    let actual = marshal;
    assert.deepEqual(expected,actual);
  });
});

