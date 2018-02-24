const assert = require("chai").assert;
const Player = require("../../src/models/player.js");
const Marshal = require('../../src/models/marshal');
const Flag = require('../../src/models/flag');
const Pieces = require('../../src/models/pieces.js');
describe("Player", () => {
  let player = {};
  let pieces = [];  
  beforeEach(
    () => {
      player = new Player("Ravi", 1, 'red');
      pieces = [new Marshal(),
        new Flag()];
    }
  );
  describe("Player.getId()", () => {
    it("Player.getId() should return player id", () => {
      assert.equal(player.getId(), '1');
    });
    it("Player.getColor() should return player id", () => {
      assert.equal(player.getColor(), 'red');
    });
  });
  describe("Player.getName()", () => {
    it("Player.getName() should return player id", () => {
      assert.equal(player.getName(), "Ravi");
    });
  });
  describe('#player.pieces', () => {
    beforeEach(()=>{
      pieces = new Pieces();
      pieces.loadPieces();
      player.addPieces(pieces,'quickGame');    
    });
    it('should add pieces to player\'s living pieces', () => {
      let expected =
      [{id: 'F', name: 'Flag', rank: 0},
        {id: 'B', name: 'Bomb', rank: 0},
        {id: 'B', name: 'Bomb', rank: 0},
        {id: '10', name: 'Marshal', rank: 10},
        {id: '3', name: 'Miner', rank: 3},
        {id: '3', name: 'Miner', rank: 3},
        {id: 'S', name: 'Spy', rank: 1},
        {id: '2', name: 'Scout', rank: 2},
        {id: '2', name: 'Scout', rank: 2},
        {id: '9', name: 'General', rank: 9} ];
      assert.sameDeepMembers(player.livePieces, expected);
    });
    it('should remove given piece from player\'s live pieces', () => {
      player.kill('F');
      let piece = new Flag();
      assert.notInclude(player.livePieces, piece);
    });
    it('should add dead piece to player\'s dead pieces', () => {
      player.kill('F');
      let piece = new Flag();
      assert.notInclude(player.deadPieces, piece);
    });
    it('should give piece index of given piece Id', () => {
      assert.equal(player.getPieceIndex('10'), 9);
    });
  });
  describe('#hasLost', () => {
    beforeEach(()=>{
      pieces = new Pieces();
      pieces.loadPieces();
      player.addPieces(pieces,'quickGame');    
    });
    it('should return false if flag is not captured', () => {
      assert.isUndefined(player.hasFlagCaptured());
    });
    it('should return true if flag is captured', () => {
      player.kill('F');
      assert.isDefined(player.hasFlagCaptured());
    });
    it('should return true if player is left with moving pieces', () => {
      assert.isOk(player.hasAnyMovingPieceLeft());
    });
    it('should return false if player is left with no moving pieces', () => {
      player.kill('S');
      player.kill('2');
      player.kill('2');
      player.kill('3');
      player.kill('3');
      player.kill('9');
      player.kill('10');
      assert.isNotOk(player.hasAnyMovingPieceLeft());
    });
    it('should return true if player has lost by capturing flag', () => {
      player.kill('F');
      assert.isOk(player.hasLost());
    });
    it('should return true if player does not have any moving piece', () => {
      player.kill('S');
      player.kill('2');
      player.kill('2');
      player.kill('3');
      player.kill('3');
      player.kill('9');
      player.kill('10');
      assert.isOk(player.hasLost());
    });
  });
});
