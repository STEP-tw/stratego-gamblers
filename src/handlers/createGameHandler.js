const Game = require('../models/game.js');
class CreateGameHandler {
  constructor() {
    this.id = 1;
  }
  execute(req, res) {
    let game = new Game(this.id);
    let playerName = req.params.name;
    let playerId = req.app.sessionManager.createSession(playerName);
    game.addPlayer(playerName,'red',playerId);
    req.app.game = game;
    res.send(`${this.id}`);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = CreateGameHandler;
