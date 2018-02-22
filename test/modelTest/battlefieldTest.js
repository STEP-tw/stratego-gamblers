const assert=require('chai').assert;
const Battlefield=require('../../src/models/battlefield.js');
const Flag = require('../../src/models/flag.js');
const Marshal = require('../../src/models/marshal.js');
const Pieces = require('../../src/models/pieces.js');

describe('Battlefield',()=>{
  let battlefield={};
  let pieces = {};
  beforeEach(() => {
    battlefield = new Battlefield();
    pieces = new Pieces();    
  });
  describe('#addPiece',()=>{
    it('should add piece into battlefield',()=>{
      let flag = new Flag();
      battlefield.addPiece(flag,'0_0');
      let expected = {'0_0':{id:'F',name:'Flag',rank:0}};
      let actual=battlefield.getPlacedPositions();
      assert.deepEqual(expected,actual);
    });
    it('should add multiple piece into battlefield',()=>{
      let flag = new Flag();
      let marshal = new Marshal();
      battlefield.addPiece(flag,'0_0');
      battlefield.addPiece(marshal,'0_4');
      let expected = {'0_0':{id:'F',name:'Flag',rank:0},
        '0_4':{id:'10',name:'Marshal',rank:10}};
      let actual=battlefield.getPlacedPositions();
      assert.deepEqual(expected,actual);
    });
  });
  describe('#getAttackMovesFor', () => {
    it('should give attack moves for piece of a particular player',()=>{
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
      pieces.loadPieces('quickGame');
      let redArmyPos = {'3_2':'S','3_1':'B'};
      let blueArmyPos = {'3_5':'2','4_1':'B','3_3':'S'};
      battlefield.setFieldFor(0,pieces,redArmyPos);
      battlefield.setFieldFor(1,pieces,blueArmyPos);
      let expected = ['2_2'];
      let actual=battlefield.getFreeMoves(0,'3_2');
      assert.deepEqual(expected,actual);
    });
  });
  describe('setFieldFor',()=>{
    it('should set battlefield for player with given location & pieces',()=>{
      pieces.loadPieces();
      battlefield.setFieldFor(0,pieces,{'0_0':'F'});
      assert.deepEqual(battlefield.getArmyPos(0),{'0_0':'F'});
    });
    it('should return pieces of given playerId', () => {
      pieces.loadPieces();
      let marshal = new Marshal();
      battlefield.setFieldFor(0, pieces, {'0_0': 'F', '0_1': '10'});
      assert.deepInclude(battlefield.getPiecesOf(0),marshal);
    });
  });
});
