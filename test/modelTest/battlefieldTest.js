const assert=require('chai').assert;
const Battlefield=require('../../src/models/battlefield.js');
const Flag = require('../../src/models/flag.js');
const Marshal = require('../../src/models/marshal.js');
const Miner = require('../../src/models/miner.js');
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
  describe('#battle',()=>{
    beforeEach(()=>{
      battlefield = new Battlefield();
      pieces = new Pieces();
      pieces.loadPieces();
      redArmyPos = {'3_2':'3','3_1':'B','4_3':'S'};
      blueArmyPos = {'3_3':'10','4_1':'B','4_2':'S'};
      battlefield.setFieldFor(0,pieces,redArmyPos);
      battlefield.setFieldFor(1,pieces,blueArmyPos);
    });
    it('should kill opponents piece when my piece is of higher rank',()=>{
      battlefield.addAsLastSelectedLoc(1,'3_3');
      battlefield.battle('1','3_2');
      let actual = battlefield.getPiece(1,'3_2');
      let expected = new Marshal();
      assert.deepEqual(actual,expected);
    });
    it('should kill my piece when opponent piece is of higher rank',()=>{
      battlefield.addAsLastSelectedLoc(1,'4_2');
      battlefield.battle('1','3_2');
      let actual = battlefield.getPiece(0,'3_2');
      let expected = new Miner();
      assert.deepEqual(actual,expected);
      actual = battlefield.getPiece(1,'4_2');
      expected = undefined;
      assert.deepEqual(actual,expected);
    });
    it('should kill both pieces when both pieces are of same rank',()=>{
      battlefield.addAsLastSelectedLoc(1,'4_2');
      battlefield.battle('1','4_3');
      let actual = battlefield.getPiece(0,'4_2');
      let expected = undefined;
      assert.deepEqual(actual,expected);
      actual = battlefield.getPiece(1,'4_3');
      expected = undefined;
      assert.deepEqual(actual,expected);
    });
  });
});
