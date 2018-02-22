const assert=require('chai').assert;
const Bomb=require('../../src/models/bomb.js');
const Scout=require('../../src/models/scout.js');

describe('Bomb',()=>{
  it('should return instance of Bomb',()=>{
    let bomb = new Bomb();
    let expected = {id:'B',name:'Bomb',rank:0};
    let actual = bomb;
    assert.deepEqual(expected,actual);
  });
  it('should return false for movement',()=>{
    let bomb = new Bomb();
    assert.isNotOk(bomb.isMovable());
  });
  describe('attackedBy',()=>{
    it('should kill attacking piece when attacked on bomb',()=>{
      let scout = new Scout();    
      let bomb = new Bomb();    
      let actual = bomb.attackedBy(scout);
      let expected = {attackingPiece: true, defendingPiece: false};
      assert.deepEqual(actual,expected);
    });
  });
});
