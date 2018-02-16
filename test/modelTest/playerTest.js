const assert = require("chai").assert;
const Player = require("../../src/models/player.js");

describe("Player", () => {
  let player={};
  beforeEach(
    ()=>{
      player = new Player("Ravi", 1);
    }
  );
  describe("Player.getId()", () => {
    it("Player.getId() should return player id", () => {
      assert.equal(player.getId(), 1);
    });
  });
  describe("Player.getName()", () => {
    it("Player.getName() should return player id", () => {
      assert.equal(player.getName(), "Ravi");
    });
  });
});
