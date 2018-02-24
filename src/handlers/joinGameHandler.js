class JoinGameHandler {
  constructor() {}
  execute(req, res) {
    let game = req.app.game || {};
    let playerName = req.body.name.trim();
    let playerId = req.app.sessions.createSession(playerName);
    let gameId = req.body.gameid;
    if(!this.isValidName(playerName)){
      res.redirect("/");
      return;
    }
    if (gameId != game.id) {
      res.redirect("/");
      return;
    }
    if (!game.haveBothPlayersJoined()) {
      game.addPlayer(playerName,playerId,'blue');
      res.cookie('sessionId',playerId);
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
