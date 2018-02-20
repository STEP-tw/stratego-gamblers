const assert=require('chai').assert;
const Battlefield=require('../../src/models/battlefield.js');
const Flag = require('../../src/models/flag.js');
const Marshal = require('../../src/models/marshal.js');
const Pieces = require('../../src/models/pieces.js');

describe('Battlefield',()=>{
  describe('#addPiece',()=>{
    it('should add piece into battlefield',()=>{
      let battlefield = new Battlefield();
      let flag = new Flag();
      battlefield.addPiece(flag,'0_0');
      let expected = {'0_0':{id:'F',name:'Flag',rank:0}};
      let actual=battlefield.getPlacedPositions();
      assert.deepEqual(expected,actual);
    });
    it('should add multiple piece into battlefield',()=>{
      let battlefield = new Battlefield();
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
      let battlefield = new Battlefield();
      let pieces = new Pieces();
      pieces.loadPieces();
      battlefield.setFieldFor(0,pieces,{'0_0':'F'});
      assert.deepEqual(battlefield.getArmyPos(0),{'0_0':'F'});
    });
  });
});
