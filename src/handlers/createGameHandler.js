const randomIdGenerator = require('../lib/utils.js').randomIdGenerator;
const Game = require('../models/game.js');
class CreateGameHandler {
  constructor() {
  }
  execute(req, res) {
    let playerName = req.body.name;
    let type = req.body.type;
    if(!playerName || !type){
      res.status(404).end();
      return;
    }
    if(!this.isValidName(playerName)){
      res.status(400).send('Inavlid Player Name');
      return;
    }
    let gameId = randomIdGenerator();
    let game = new Game(gameId);
    game.loadPieces();
    let playerId = req.app.sessions.createSession(playerName);
    res.cookie('sessionId',playerId);
    res.cookie('gameId',gameId);
    game.addPlayer(playerName,playerId,'red');
    req.app.gamesHandler.createNewGame(gameId,game);
    game.addGameType(type);
    res.status(200).send(`${gameId}`);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
  isValidName(playerName){
    return playerName.match(/(^[a-z])\w*$/gi);
  }
}

module.exports = CreateGameHandler;
