const assert = require('chai').assert;
const Piece =require('../../src/models/piece.js');
const Scout=require('../../src/models/scout.js');
const Marshal=require('../../src/models/marshal.js');
const Bomb=require('../../src/models/bomb.js');
const Miner=require('../../src/models/miner.js');
const Spy=require('../../src/models/spy.js');

describe('Piece',()=>{
  describe('#getPotentialMoves',()=>{
    let piece=new Piece();
    it('should give potential from given location',()=>{
      let posMap = {myArmy:[],opponentArmy:[],lakeArea:[]};
      let actual=piece.getPotentialMoves('2_2',posMap);
      let expected={freeMoves:['3_2','1_2','2_3','2_1'],attackMoves:[]};
      assert.deepEqual(actual,expected);
    });
    it('should give potential excepting my army from given location',()=>{
      let posMap = {myArmy:['2_3'],opponentArmy:[],lakeArea:[]};
      let actual=piece.getPotentialMoves('2_2',posMap);
      let expected={freeMoves:['3_2','1_2','2_1'],attackMoves:[]};
      assert.deepEqual(actual,expected);
    });
    it('should give potential attacking moves from given location',()=>{
      let posMap = {myArmy:[],opponentArmy:['2_3'],lakeArea:[]};
      let actual=piece.getPotentialMoves('2_2',posMap);
      let expected={freeMoves:['3_2','1_2','2_1'],attackMoves:['2_3']};
      assert.deepEqual(actual,expected);
    });
    it('should give true for moving piece',()=>{
      assert.isOk(piece.isMovable());
    });
  });
  describe('attackedBy',()=>{
    it('should kill opponent piece when my piece is of higher rank',()=>{
      let scout = new Scout();
      let marshal = new Marshal();
      let actual = scout.attackedBy(marshal);
      let expected = {attackingPiece: false, defendingPiece: true};
      assert.deepEqual(actual,expected);
    });
    it('should kill my piece when opponent piece is of higher rank',()=>{
      let scout = new Scout();
      let marshal = new Marshal();
      let actual = marshal.attackedBy(scout);
      let expected = {attackingPiece: true, defendingPiece: false};
      assert.deepEqual(actual,expected);
    });
    it('should kill both piece when both pieces are of same rank',()=>{
      let scout = new Scout();
      let actual = scout.attackedBy(scout);
      let expected = {attackingPiece: true, defendingPiece: true};
      assert.deepEqual(actual,expected);
    });
    it('should diffuse bomb when attacked by miner',()=>{
      let miner = new Miner();    
      let bomb = new Bomb();    
      let actual = bomb.attackedBy(miner);
      let expected = {attackingPiece: false, defendingPiece: true};
      assert.deepEqual(actual,expected);
    });
    it('should kill marshal when attacked by spy',()=>{
      let spy = new Spy();     
      let marshal = new Marshal();    
      let actual = marshal.attackedBy(spy);
      let expected = {attackingPiece: false, defendingPiece: true};
      assert.deepEqual(actual,expected);
    });
  });
});
