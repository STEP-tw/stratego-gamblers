class JoinGameHandler {
  constructor() {}
  execute(req, res) {
    let gamesHandler = req.app.gamesHandler;
    let gameId = req.body.gameId;
    let playerName = req.cookies.name;
    if(!gameId){
      res.status(404).end();      
      return;
    }
    if(!gamesHandler.doesGameExists(gameId)){
      res.status(400).send('Inavlid Game Id');
      return;
    }
    let game = gamesHandler.getGame(gameId);
    let playerId = req.cookies.sessionId;    
    if (!game.haveBothPlayersJoined()) {
      game.addPlayer(playerName,playerId,'blue');
      res.cookie('gameId',gameId);      
      res.redirect('/setupArmy');
      return;
    }
    res.redirect('/');
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = JoinGameHandler;
