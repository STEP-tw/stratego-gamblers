const assert = require("chai").assert;
const Game = require("../../src/models/game.js");

describe("Game", () => {
  let game={};
  beforeEach(
    ()=>{
      game = new Game("gameId");
    }
  );
  describe("Game.getPlayers()", () => {
    it("Game.getId() should return game id", () => {
      assert.equal(game.getId(), "gameId");
    });
  });
  describe("Game.getPlayers()", () => {
    it("should return empty array when game has no players", () => {
      assert.deepEqual(game.getPlayers(),[]);
    });
    it("should return players array when game has players", () => {
      game.addPlayer("ravi");
      assert.deepEqual(game.getPlayers(),[{name:"ravi", id:0}]);
    });
  });
  describe("Game.addPlayer()", () => {
    it("Game.addPlayer() should return game id", () => {
      let expectedOutput = {name: "Ravi", id: 0};
      let actual=game.addPlayer("Ravi");
      assert.deepEqual(actual, expectedOutput);
    });
  });
  describe('Game.getPlayerName()', () => {
    beforeEach(
      ()=>{
        game.addPlayer("ravi");
        game.addPlayer("ankur");
      }
    );
    it('should return first player name for red color team', () => {
      assert.equal(game.getPlayerName("red"),"ravi");
    });
    it('should return first player name for blue color team', () => {
      assert.equal(game.getPlayerName("blue"),"ankur");
    });
  });
  describe('setBattlefield',()=>{
    it('should set the battlefield for a player',()=>{
      game.setBattlefieldFor(0,{'0_0':'F'});
      game.setBattlefieldFor(1,{'3_7':'B'});
      let actual = game.getBattlefieldFor(0);
      let expected = {'0_0':'F','3_7':0};
      assert.deepEqual(actual,expected);
      actual = game.getBattlefieldFor(1);
      expected = {'0_0':0,'3_7':'B'};   
      assert.deepEqual(actual,expected);         
    });
  });
});
