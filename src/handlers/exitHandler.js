const isGameOver = require('../lib/lib.js').isGameOver;

class ExitHandler {
  constructor() {}

  restartGame(req, res) {
    let previousUrl = req.cookies.previousUrl;
    let game = req.app.game;
    let gameStatus = req.cookies.gameStatus;
    if (isGameOver(game,gameStatus)|| gameStatus=='quit') {
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
    let teamColor = game.getPlayerColorBy(sessionId);
    game.quit(teamColor);
    this.clearCookies(req,res);
    res.redirect('/');
  }
  clearCookies(req,res){
    res.clearCookie('sessionId');
    res.clearCookie('gameStatus');
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
