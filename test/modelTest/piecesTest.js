const assert=require('chai').assert;
const Pieces=require('../../src/models/pieces.js');

describe('Pieces',()=>{
  describe('#loadPieces',()=>{
    it('should load the piece for specific game type and team',()=>{
      let pieces=new Pieces();
      pieces.loadPieces('quickGame','red');
      let actual = pieces.getPiece('F');
      let expected = {id:'F',name:'Flag',rank:0,team:'red'};
      assert.deepEqual(expected,actual);
    }); 
    it('should load the piece for specific game type and team',()=>{
      let pieces=new Pieces();
      pieces.loadPieces('quickGame','blue');
      let actual = pieces.getPiece('F');
      let expected = {id:'F',name:'Flag',rank:0,team:'blue'};
      assert.deepEqual(expected,actual);
    });   
  });
  describe('#loadPieces',()=>{
    it('should load multiple pieces for specific game type',()=>{
      let pieces=new Pieces();
      pieces.loadPieces('quickGame','red');
      let actual = pieces.getPiece('F');
      let expected = {id:'F',name:'Flag',rank:0,team:'red'};
      assert.deepEqual(expected,actual);
      actual = pieces.getPiece('10');
      expected = {id:'10',name:'Marshal',rank:10,team:'red'};
      assert.deepEqual(expected,actual);      
    });   
  });
});