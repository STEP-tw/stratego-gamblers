class JoinGameHandler {
  constructor() {}
  execute(req, res) {
    let game = req.app.game || {};
    let playerName = req.body.name;
    let gameId = req.body.gameid;
    if (gameId != game.id) {
      res.redirect("/");
      return;
    }
    if (!game.areBothPlayersready()) {
      game.addPlayer(playerName);
      res.redirect('/setupBlueArmy');
    }
    res.redirect("/");
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = JoinGameHandler;
