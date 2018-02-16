const assert=require('chai').assert;
const Marshal=require('../../src/models/marshal.js');

describe('Marshal',()=>{
  it('should return instance of Marshal for red team',()=>{
    let marshal = new Marshal('red');
    let expected = {id:'10',name:'Marshal',rank:10,team:'red'};
    let actual = marshal;
    assert.deepEqual(expected,actual);
  });
  it('should return instance of Marshal for blue team',()=>{
    let marshal = new Marshal('blue');
    let expected = {id:'10',name:'Marshal',rank:10,team:'blue'};
    let actual = marshal;
    assert.deepEqual(expected,actual);
  });
});

