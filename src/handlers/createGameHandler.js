const randomIdGenerator = require('../lib/utils.js').randomIdGenerator;
const Game = require('../models/game.js');
class CreateGameHandler {
  constructor() {
  }
  execute(req, res) {
    let gameId = randomIdGenerator();
    let game = new Game(gameId);
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
    res.cookie('gameId',gameId);    
    game.addPlayer(playerName,playerId,'red');
    req.app.gamesHandler.createNewGame(gameId,game);
    res.send(`${gameId}`);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
  isValidName(playerName){
    return playerName.match(/^\D\w*$/gi);
  }
}

module.exports = CreateGameHandler;
