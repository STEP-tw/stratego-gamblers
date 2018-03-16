const randomIdGenerator = require('../lib/utils.js').randomIdGenerator;
class GamesHandler {
  constructor(){
    this.games={};
  }
  createNewGame(gameId,game){
    this.games[gameId] = game; 
  }
  doesGameExists(gameId){
    return gameId in this.games;
  }
  getGame(gameId){
    return this.games[gameId];
  }
  deleteGame(gameId){
    delete this.games[gameId];
  }
  getGameId(){
    let gameId = randomIdGenerator();
    while(this.doesGameExists(gameId)){
      gameId = randomIdGenerator();
    }
    return gameId;
  }
}

module.exports = GamesHandler;