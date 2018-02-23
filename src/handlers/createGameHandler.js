const randomIdGenerator = require('../lib/utils.js').randomIdGenerator;
const Game = require('../models/game.js');
class CreateGameHandler {
  constructor() {
  }
  execute(req, res) {
    let id = randomIdGenerator();
    let game = new Game(id);
    let playerName = req.params.name;
    let playerId = req.app.sessions.createSession(playerName);
    res.cookie('sessionId',playerId);
    game.addPlayer(playerName,playerId,'red');
    req.app.game = game;
    res.send(`${id}`);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = CreateGameHandler;
