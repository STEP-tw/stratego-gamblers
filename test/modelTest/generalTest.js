const assert=require('chai').assert;
const General=require('../../src/models/general.js');

describe('General',()=>{
  it('should return instance of General for red team',()=>{
    let general = new General('red');
    let expected = {id:'9',name:'General',rank:9,team:'red'};
    let actual = general;
    assert.deepEqual(expected,actual);
  });
  it('should return instance of General for blue team',()=>{
    let general = new General('blue');
    let expected = {id:'9',name:'General',rank:9,team:'blue'};
    let actual = general;
    assert.deepEqual(expected,actual);
  });
});

