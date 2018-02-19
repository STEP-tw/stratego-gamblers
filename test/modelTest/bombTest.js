const assert=require('chai').assert;
const Bomb=require('../../src/models/bomb.js');

describe('Bomb',()=>{
  it('should return instance of Bomb',()=>{
    let bomb = new Bomb();
    let expected = {id:'B',name:'Bomb',rank:0};
    let actual = bomb;
    assert.deepEqual(expected,actual);
  });
});

