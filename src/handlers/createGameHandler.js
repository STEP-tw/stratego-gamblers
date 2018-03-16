const Game = require('../models/game.js');
class CreateGameHandler {
  constructor() {
  }
  execute(req, res) {
    let playerName = req.cookies.name;
    let playerId = req.cookies.sessionId;
    let type = req.body.type;
    if(!type){
      res.status(404).end();
      return;
    }
    let gamesHandler = req.app.gamesHandler;
    let gameId = gamesHandler.getGameId();
    let game = new Game(gameId);
    game.loadPieces();
    res.cookie('gameId',gameId);
    game.addPlayer(playerName,playerId,'red');
    gamesHandler.createNewGame(gameId,game);
    game.addGameType(type);
    res.status(200).send(`${gameId}`);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = CreateGameHandler;
