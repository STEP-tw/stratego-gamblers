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
}

module.exports = GamesHandler;