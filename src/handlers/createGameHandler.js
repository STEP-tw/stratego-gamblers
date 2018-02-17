const Game = require('../models/game.js');
class CreateGameHandler {
  constructor() {
    this.id = 1;
  }
  execute(req, res) {
    let game = new Game(this.id);
    let userName = req.params.name;
    game.addPlayer(userName);
    req.app.game = game;
    res.send(`${this.id}`);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = CreateGameHandler;
