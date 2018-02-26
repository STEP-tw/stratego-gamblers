const isGameOver = require('../lib/lib.js').isGameOver;

class ExitHandler {
  constructor() {}

  restartGame(req, res) {
    console.log(`I am here at restart game`);
    let previousUrl = req.cookies.previousUrl;
    let game = req.app.game;
    let gameStatus = req.cookies.gameStatus;
    if (isGameOver(game,gameStatus)|| gameStatus=='quit') {
      delete req.app.game;
      res.clearCookie('sessionId');
      res.clearCookie('gameStatus');
      return res.redirect('/');
    }
    res.redirect(previousUrl);
  }

  quitGame(req, res) {
    console.log(`I am here at quit game`);
    let game = req.app.game;
    let sessionId = req.cookies.sessionId;
    let teamColor = game.getPlayerColorBy(sessionId);
    game.quit(teamColor);
    res.clearCookie('sessionId');
    res.clearCookie('gameStatus');
    res.redirect('/');
  }
}

module.exports = ExitHandler;
