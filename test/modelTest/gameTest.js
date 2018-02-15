const assert=require('chai').assert;
const Game = require('../../src/models/game.js');

describe('Game',()=>{
  describe('setBattlefield',()=>{
    it('should set the battlefield for a player',()=>{
      let game = new Game();
      game.createPiecesFor('quickGame');
      game.setBattlefieldFor(0,{'0_0':'F'});
      let actual = game.battlefield;
      let pieces = [{"0_0": {id:'F',name:'Flag',rank:0,team:'red'}}];
      let expected = {"lakeArea": [],"placedPositions": pieces};
      assert.deepEqual(expected,actual);
    });
  });
});