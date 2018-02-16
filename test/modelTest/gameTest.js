const assert = require("chai").assert;
const Game = require("../../src/models/game.js");

describe("Game", () => {
  let game={};
  beforeEach(
    ()=>{
      game = new Game("gameId");
    }
  );
  describe("Game.getId()", () => {
    it("Game.getId() should return game id", () => {
      assert.equal(game.getId(), "gameId");
    });
  });
  describe("Game.addPlayer()", () => {
    it("Game.addPlayer() should return game id", () => {
      let expectedOutput = {name: "Ravi", id: 0};
      let actual=game.addPlayer("Ravi");
      assert.deepEqual(actual, expectedOutput);
    });
  });
  describe('setBattlefield',()=>{
    it('should set the battlefield for a player',()=>{
      let game = new Game();
      game.createPiecesFor('quickGame');
      game.setBattlefieldFor(0,{'0_0':'F'});
      let actual = game.battlefield;
      let pieces = {"0_0": {id:'F',name:'Flag',rank:0,team:'red'}};
      let expected = {"lakeArea": [],"placedPositions": pieces};
      assert.deepEqual(expected,actual);
    });
  });
});
