const assert = require("chai").assert;
const Player = require("../../src/models/player.js");
const Marshal = require('../../src/models/marshal');
const Flag = require('../../src/models/flag');
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
      assert.equal(player.getId(), 1);
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
    it('should add pieces to player\'s living pieces', () => {
      player.addPieces(pieces);
      assert.sameDeepMembers(player.livePieces, pieces);
    });
    it('should remove given piece from player\'s live pieces', () => {
      player.addPieces(pieces);
      player.kill('F');
      let piece = new Flag();
      assert.notInclude(player.livePieces, piece);
    });
    it('should add dead piece to player\'s dead pieces', () => {
      player.addPieces(pieces);
      player.kill('F');
      let piece = new Flag();
      assert.notInclude(player.deadPieces, piece);
    });
    it('should give piece index of given piece Id', () => {
      player.addPieces(pieces);
      assert.equal(player.getPieceIndex('10'), 0);
    });
  });
  describe('#hasLost', () => {
    it('should return false if flag is not captured', () => {
      player.addPieces(pieces);
      assert.isUndefined(player.hasFlagCaptured());
    });
    it('should return true if flag is captured', () => {
      player.addPieces(pieces);
      player.kill('F');
      assert.isDefined(player.hasFlagCaptured());
    });
    it('should return true if player is left with moving pieces', () => {
      player.addPieces(pieces);
      assert.isOk(player.hasAnyMovingPieceLeft());
    });
    it('should return false if player is left with no moving pieces', () => {
      player.addPieces(pieces);
      player.kill('10');
      assert.isNotOk(player.hasAnyMovingPieceLeft());
    });
    it('should return true if player has lost by capturing flag', () => {
      player.addPieces(pieces);
      player.kill('F');
      assert.isOk(player.hasLost());
    });
    it('should return true if player does not have any moving piece', () => {
      player.addPieces(pieces);
      player.kill('10');
      assert.isOk(player.hasLost());
    });
  });
});
