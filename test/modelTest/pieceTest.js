const assert = require('chai').assert;
const Piece =require('../../src/models/piece.js');

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
});