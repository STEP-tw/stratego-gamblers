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
      let expectedOutput = {name: "Ravi", id: 0}
      let actual=game.addPlayer("Ravi");
      assert.deepEqual(actual, expectedOutput);
    });
  });
});
