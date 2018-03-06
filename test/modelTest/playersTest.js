const assert = require('chai').assert;
const Players=require('../../src/models/players.js');

describe('Players', () => {
  beforeEach(()=>{
    players = new Players();
    players.addPlayer("ravi", 12345, 'red');
    players.addPlayer("ankur", 123456, 'blue');
  });
  describe('Game.getPlayerName()', () => {
    it('should return first player name for red color team', () => {
      assert.equal(players.getPlayerNameBy("red"), "ravi");
    });
    it('should return second player name for blue color team', () => {
      assert.equal(players.getPlayerNameBy("blue"), "ankur");
    });
    it('should return player name for given id', () => {
      assert.equal(players.getPlayerName(1), "ankur");
    });
  });
  describe('Game.getOpponentName()', () => {
    it('should return opponent name for red color team', () => {
      assert.equal(players.getOpponentNameBy("red"), "ankur");
    });
    it('should return opponent name for blue color team', () => {
      assert.equal(players.getOpponentNameBy("blue"), "ravi");
    });
  });
  describe("Game.addPlayer()", () => {
    it("Game.addPlayer() should return player details ", () => {
      let players = new Players();      
      players.addPlayer("Ravi", 0, "red");
      let expectedOutput = {
        name: "Ravi",
        id: 0,
        color: "red",
        "deadPieces": [],
        "livePieces": []
      };
      let actual = players.getPlayer(0);
      assert.deepEqual(actual, expectedOutput);
    });
  });
});