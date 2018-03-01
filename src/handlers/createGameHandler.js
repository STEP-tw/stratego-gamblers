const randomIdGenerator = require('../lib/utils.js').randomIdGenerator;
const Game = require('../models/game.js');
class CreateGameHandler {
  constructor() {
  }
  execute(req, res) {
    let id = randomIdGenerator();
    let game = new Game(id);
    game.loadPieces();
    let playerName = req.params.name;
    let type = req.params.type;
    console.log(type);
    if(!this.isValidName(playerName)){
      res.end();
      return;
    }
    let playerId = req.app.sessions.createSession(playerName);
    res.cookie('sessionId',playerId);
    game.addPlayer(playerName,playerId,'red');
    req.app.game = game;
    res.send(`${id}`);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
  isValidName(playerName){
    return playerName.match(/^\D\w*$/gi);
  }
}

module.exports = CreateGameHandler;
