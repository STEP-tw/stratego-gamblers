const assert=require('chai').assert;
const General=require('../../src/models/general.js');

describe('General',()=>{
  it('should return instance of General',()=>{
    let general = new General();
    let expected = {id:'9',name:'General',rank:9};
    let actual = general;
    assert.deepEqual(expected,actual);
  });
});

