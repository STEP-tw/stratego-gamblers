class JoinGameHandler {
  constructor() {}
  execute(req, res) {
    let gamesHandler = req.app.gamesHandler;
    let gameId = req.body.gameId;
    let playerName = req.body.name;
    if(!gameId || !playerName){
      res.status(404).end();      
      return;
    }
    if(!this.isValidName(playerName) || !gamesHandler.doesGameExists(gameId)){
      res.status(400).send('Inavlid Player Name or Game Id');
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
    res.redirect('/');
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
  isValidName(playerName){
    return playerName.match(/(^[a-z])\w*$/gi);
  }
}

module.exports = JoinGameHandler;
