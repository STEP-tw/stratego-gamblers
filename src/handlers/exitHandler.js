class ExitHandler {
  constructor() {}

  restartGame(req, res) {
    let previousUrl = req.cookies.previousUrl;
    let game = req.app.game;
    if (game.isOver()) {
      let gameId = req.cookies.gameId;
      req.app.gamesHandler.deleteGame(gameId);
      this.clearCookies(req,res);
      return res.redirect('/');
    }
    res.redirect(previousUrl);
  }

  quitGame(req, res) {
    let game = req.app.game;
    let sessionId = req.cookies.sessionId;
    let playerId = game.getPlayerIndexBy(sessionId);
    let teamColor = game.getPlayerColorBy(playerId);
    game.quit(teamColor);
    this.clearCookies(req,res);
    res.redirect('/');
  }
  clearCookies(req,res){
    res.clearCookie('sessionId');
    res.clearCookie('gameId'); 
  }
  restartGameHandler(){
    return this.restartGame.bind(this);
  }
  quitGameHandler(){
    return this.quitGame.bind(this);
  }
}

module.exports = ExitHandler;
