class JoinGameHandler {
  constructor() {}
  execute(req, res) {
    let game = req.app.game || {};
    let playerName = req.body.name.trim();
    let gameId = req.body.gameid;
    if(!playerName.length){
      res.redirect("/");
      return;
    }
    if (gameId != game.id) {
      res.redirect("/");
      return;
    }
    if (!game.haveBothPlayerJoined()) {
      game.addPlayer(playerName);
      res.redirect('/setupBlueArmy');
      return;
    }
    res.redirect("/");
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = JoinGameHandler;
