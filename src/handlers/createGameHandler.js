const Game = require('../models/game.js');
class AddPlayerHandler {
  constructor() {
    this.id = 0;
  }
  execute(req, res) {
    this.id++;
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

module.exports = AddPlayerHandler;
