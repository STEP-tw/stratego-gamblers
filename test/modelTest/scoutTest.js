const assert=require('chai').assert;
const Scout=require('../../src/models/scout.js');

describe('Scout',()=>{
  it('should return instance of Scout for red team',()=>{
    let scout = new Scout('red');
    let expected = {id:'2',name:'Scout',rank:2,team:'red'};
    let actual = scout;
    assert.deepEqual(expected,actual);
  });
  it('should return instance of Scout for blue team',()=>{
    let scout = new Scout('blue');
    let expected = {id:'2',name:'Scout',rank:2,team:'blue'};
    let actual = scout;
    assert.deepEqual(expected,actual);
  });
});

