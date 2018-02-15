const assert=require('chai').assert;
const Pieces=require('../../src/models/pieces.js');

describe('Pieces',()=>{
  describe('#loadPieces',()=>{
    it('should load the pieces for specific game type',()=>{
      let pieces=new Pieces();
      pieces.loadPieces('quickGame','red');
      let actual = pieces.getPiece('F');
      let expected = {id:'F',name:'Flag',rank:0,team:'red'};
      assert.deepEqual(expected,actual);
    });   
  });
});