const assert=require('chai').assert;
const Battlefield=require('../../src/models/battlefield.js');

describe('Battlefield',()=>{
  describe('#addPiece',()=>{
    it('should add piece into battlefield',()=>{
      let battlefield = new Battlefield();
      let piece = {id:'F',name:'Flag',rank:0,team:'red'};
      battlefield.addPiece(piece,'0_0','F');
      let expected = [{'0_0':{id:'F',name:'Flag',rank:0,team:'red'}}];  
      let actual=battlefield.getPlacedPositions();
      assert.deepEqual(expected,actual);
    });
    it('should add multiple piece into battlefield',()=>{
      let battlefield = new Battlefield();
      let flag = {id:'F',name:'Flag',rank:0,team:'red'};
      let marshal = {id:'10',name:'Marshal',rank:10,team:'red'};
      battlefield.addPiece(flag,'0_0','F');
      battlefield.addPiece(marshal,'0_4','10');      
      let expected = [{'0_0':{id:'F',name:'Flag',rank:0,team:'red'}},
        {'0_4':{id:'10',name:'Marshal',rank:10,team:'red'}}];  
      let actual=battlefield.getPlacedPositions();
      assert.deepEqual(expected,actual);
    });
  });
});