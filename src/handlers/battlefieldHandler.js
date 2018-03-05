const isValidData = require('../lib/validate.js').isValidData;
const getStatusMsg = require('../lib/lib.js').getStatusMsg;
class BattlefieldHandler {
  constructor(){

  }
  setBattlefield(req,res){
    let game = req.app.game;
    let playerId = req.params.playerId;
    let placedPos = req.body;
    let gameType = game.getGameType();
    if (isValidData(playerId, placedPos,gameType)) {
      game.setBattlefieldFor(playerId, placedPos);
      res.end();
      return;
    }
    res.status(206).send('pieces or location missing!');
  }
  getBattlefield(req,res){
    let game = req.app.game;
    let sessionId = req.cookies.sessionId;
    let boardInfo = game.getBoardFor(sessionId);
    res.send(JSON.stringify(boardInfo));
  }
  updateBattlefield(req,res){
    let game = req.app.game;
    let sessionId = req.cookies.sessionId;
    let location = req.body.location;
    let playerId = game.getPlayerIndexBy(sessionId);
    if (game.isCurrentPlayer(playerId)) {
      let potentialMoves = game.getPotentialMoves(location);
      game.updatePieceLocation(location);
      res.send(potentialMoves);
      res.status(200);
      res.end();
      return;
    }
    res.status(406);
    res.send('invalid request');
    res.end();
  }
  sendBattlefieldChanges(req,res){
    let timeStamp = req.body.timeStamp;
    let sessionId = req.cookies.sessionId;
    let game = req.app.game;
    if(!game.isBoardUpdated(timeStamp)){
      res.end();
      return;
    }
    let gameChanges = game.getChanges(sessionId);
    gameChanges.status = getStatusMsg(sessionId,gameChanges.status);
    res.cookie('gameStatus', gameChanges.status.gameOver);
    res.send(gameChanges);
  }
  sendRevealedBattlefield(req,res){
    let game = req.app.game;
    let sessionId = req.cookies.sessionId;
    let battlefield = game.revealBattlefieldFor(sessionId);
    res.send(JSON.stringify(battlefield));
  }
}
module.exports = BattlefieldHandler;
