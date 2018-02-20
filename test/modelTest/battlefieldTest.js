const assert=require('chai').assert;
const Battlefield=require('../../src/models/battlefield.js');
const Pieces=require('../../src/models/pieces.js');

describe('Battlefield',()=>{
  describe('#addPiece',()=>{
    it('should add piece into battlefield',()=>{
      let battlefield = new Battlefield();
      let piece = {id:'F',name:'Flag',rank:0,team:'red'};
      battlefield.addPiece(piece,'0_0');
      let expected = {'0_0':{id:'F',name:'Flag',rank:0,team:'red'}};
      let actual=battlefield.getPlacedPositions();
      assert.deepEqual(expected,actual);
    });
    it('should add multiple piece into battlefield',()=>{
      let battlefield = new Battlefield();
      let flag = {id:'F',name:'Flag',rank:0,team:'red'};
      let marshal = {id:'10',name:'Marshal',rank:10,team:'red'};
      battlefield.addPiece(flag,'0_0');
      battlefield.addPiece(marshal,'0_4');
      let expected = {'0_0':{id:'F',name:'Flag',rank:0,team:'red'},
        '0_4':{id:'10',name:'Marshal',rank:10,team:'red'}};
      let actual=battlefield.getPlacedPositions();
      assert.deepEqual(expected,actual);
    });
  });
  describe('#getAttackMovesFor', () => {
    it('should give attack moves for piece of a particular player',()=>{
      let battlefield = new Battlefield();
      let pieces = new Pieces();
      pieces.loadPieces('quickGame');
      let redArmyPos = {'3_2':'S','3_4':'B'};
      let blueArmyPos = {'3_3':'2','3_1':'B','4_9':'S'};
      battlefield.setFieldFor(0,pieces,redArmyPos);
      battlefield.setFieldFor(1,pieces,blueArmyPos);
      let expected = ['3_3','3_1'];
      let actual=battlefield.getAttackMovesFor(0,'3_2');
      assert.deepEqual(expected,actual);
    });
  });
  describe('#getFreeMoves', () => {
    it('should give free moves for a piece',()=>{
      let battlefield = new Battlefield();
      let pieces = new Pieces();
      pieces.loadPieces('quickGame');
      let redArmyPos = {'3_2':'S','3_1':'B'};
      let blueArmyPos = {'3_5':'2','4_1':'B','3_3':'S'};
      battlefield.setFieldFor(0,pieces,redArmyPos);
      battlefield.setFieldFor(1,pieces,blueArmyPos);
      let expected = ['4_2','2_2'];
      let actual=battlefield.getFreeMoves(0,'3_2');
      assert.deepEqual(expected,actual);
    });
  });
});
