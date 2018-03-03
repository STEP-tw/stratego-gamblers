const isValidData = require('../lib/validate.js').isValidData;

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
  getBattlefieldHandler(){
    return this.getBattlefield.bind(this);
  }
  setBattlefieldHandler(){
    return this.setBattlefield.bind(this);
  }
  updateBattlefieldHandler (){
    return this.updateBattlefield.bind(this);
  }
}
module.exports = BattlefieldHandler;
