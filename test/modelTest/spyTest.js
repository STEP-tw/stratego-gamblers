const assert=require('chai').assert;
const Spy=require('../../src/models/spy.js');

describe('Spy',()=>{
  it('should return instance of Spy',()=>{
    let spy = new Spy();
    let expected = {id:'S',name:'Spy',rank:1};
    let actual = spy;
    assert.deepEqual(expected,actual);
  });
});

