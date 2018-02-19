const assert=require('chai').assert;
const Pieces=require('../../src/models/pieces.js');

describe('Pieces',()=>{
  describe('#loadPieces',()=>{
    it('should load the piece for specific game type',()=>{
      let pieces=new Pieces();
      pieces.loadPieces('quickGame');
      let actual = pieces.getPiece('F');
      let expected = {id:'F',name:'Flag',rank:0};
      assert.deepEqual(expected,actual);
    });   
  });
  describe('#loadPieces',()=>{
    it('should load multiple pieces for specific game type',()=>{
      let pieces=new Pieces();
      pieces.loadPieces('quickGame');
      let actual = pieces.getPiece('F');
      let expected = {id:'F',name:'Flag',rank:0};
      assert.deepEqual(expected,actual);
      actual = pieces.getPiece('10');
      expected = {id:'10',name:'Marshal',rank:10};
      assert.deepEqual(expected,actual);      
    });   
  });
});