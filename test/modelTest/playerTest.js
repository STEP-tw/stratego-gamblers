const assert = require("chai").assert;
const Player = require("../../src/models/player.js");

describe("Player", () => {
  let player={};
  beforeEach(
    ()=>{
      player = new Player("Ravi", 1,'red');
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
});
