const assert=require('chai').assert;
const Spy=require('../../src/models/spy.js');

describe('Spy',()=>{
  it('should return instance of Spy for red team',()=>{
    let spy = new Spy('red');
    let expected = {id:'S',name:'Spy',rank:1,team:'red'};
    let actual = spy;
    assert.deepEqual(expected,actual);
  });
  it('should return instance of Spy for blue team',()=>{
    let spy = new Spy('blue');
    let expected = {id:'S',name:'Spy',rank:1,team:'blue'};
    let actual = spy;
    assert.deepEqual(expected,actual);
  });
});

