const assert=require('chai').assert;
const Bomb=require('../../src/models/bomb.js');

describe('Bomb',()=>{
  it('should return instance of Bomb for red team',()=>{
    let bomb = new Bomb('red');
    let expected = {id:'B',name:'Bomb',rank:0,team:'red'};
    let actual = bomb;
    assert.deepEqual(expected,actual);
  });
  it('should return instance of Bomb for blue team',()=>{
    let bomb = new Bomb('blue');
    let expected = {id:'B',name:'Bomb',rank:0,team:'blue'};
    let actual = bomb;
    assert.deepEqual(expected,actual);
  });
});

