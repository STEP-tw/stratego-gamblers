class JoinGameHandler {
  constructor() {}
  execute(req, res) {
    let gamesHandler = req.app.gamesHandler;
    let gameId = req.body.gameid;
    let playerName = req.body.name;
    if(!this.isValidName(playerName)){
      res.redirect("/");
      return;
    }
    if(!gamesHandler.doesGameExists(gameId)){
      res.redirect('/');
      return;
    }
    let game = gamesHandler.getGame(gameId);
    let playerId = req.app.sessions.createSession(playerName);
    if (!game.haveBothPlayersJoined()) {
      game.addPlayer(playerName,playerId,'blue');
      res.cookie('sessionId',playerId);
      res.cookie('gameId',gameId);      
      res.redirect('/setupArmy');
      return;
    }
    res.redirect("/");
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
  isValidName(playerName){
    return playerName.match(/^\D\w*$/gi);
  }
}

module.exports = JoinGameHandler;
