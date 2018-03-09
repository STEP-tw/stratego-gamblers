const isValidData = require('../lib/validate.js').isValidData;
const getStatusMsg = require('../lib/lib.js').getStatusMsg;
const sendData = (game,sessionId,action)=>{
  let perform = {
    'getBoard' : game.getBoardFor(sessionId),
    'reveal' : game.getRevealedBattlefield(sessionId)
  };
  return perform[action];
};
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
  getBattlefield(req,res,next){
    if(req.headers.accept=='*/*'){
      let sessionId = req.cookies.sessionId;
      let boardInfo = sendData(req.app.game,req.cookies.sessionId,'getBoard');
      boardInfo.status = getStatusMsg(sessionId,boardInfo.status);
      res.json(boardInfo);
      return;
    }
    let previousUrl = req.cookies.previousUrl;
    res.redirect(previousUrl);
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
  getBattlefieldChanges(req,res){
    let sessionId = req.cookies.sessionId;
    let game = req.app.game;
    if(!game.isBoardUpdated()){
      res.end();
      return;
    }
    let gameChanges = game.getChanges(sessionId);
    gameChanges.status = getStatusMsg(sessionId,gameChanges.status);
    res.send(gameChanges);
  }
  getRevealedBattlefield(req,res){
    let game = req.app.game;
    if(game.isOver()){
      let battlefield = sendData(game,req.cookies.sessionId,'reveal');
      res.json(battlefield);
      return;
    }
    let previousUrl = req.cookies.previousUrl;
    res.redirect(previousUrl);
  }
}
module.exports = BattlefieldHandler;
