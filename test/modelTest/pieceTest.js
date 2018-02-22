const assert = require('chai').assert;
const Piece =require('../../src/models/piece.js');
const Scout=require('../../src/models/scout.js');
const Marshal=require('../../src/models/marshal.js');

describe('Piece',()=>{
  describe('#getPotentialMove',()=>{
    let piece=new Piece();    
    it('should give potential from given location',()=>{
      let actual=piece.getPotentialMove('2_2');
      let expected=['2_3','2_1','1_2','3_2'];
      assert.sameMembers(actual,expected); 
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
      let expected = {myPiece: false, opponentPiece: true};
      assert.deepEqual(actual,expected);
    });
    it('should kill my piece when opponent piece is of higher rank',()=>{
      let scout = new Scout();
      let marshal = new Marshal();    
      let actual = marshal.attackedBy(scout);
      let expected = {myPiece: true, opponentPiece: false};
      assert.deepEqual(actual,expected);
    });
    it('should kill both piece when both pieces are of same rank',()=>{
      let scout = new Scout();    
      let actual = scout.attackedBy(scout);
      let expected = {myPiece: true, opponentPiece: true};
      assert.deepEqual(actual,expected);
    });
  });
});