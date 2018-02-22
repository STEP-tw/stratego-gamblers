const assert = require("chai").assert;
const Player = require("../../src/models/player.js");

describe("Player", () => {
  let player = {};
  let pieces = [];  
  beforeEach(
    () => {
      player = new Player("Ravi", 1, 'red');
      pieces = [{id: '10', name: 'Marshal', rank: 10},
        {id: 'F', name: 'Flag', rank: 0}];
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
      let piece = {id: 'F', name: 'Flag', rank: 0};
      assert.notInclude(player.livePieces, piece);
    });
    it('should add dead piece to player\'s dead pieces', () => {
      player.addPieces(pieces);
      player.kill('F');
      let piece = {id: 'F', name: 'Flag', rank: 0};
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
      assert.isNotOk(player.hasLost());
    });
    it('should return true if flag is captured', () => {
      player.addPieces(pieces);
      player.kill('F');
      assert.isOk(player.hasLost());
    });
  });
});
