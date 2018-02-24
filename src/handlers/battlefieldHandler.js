const validator = require('../lib/validate.js');
const getStatusMsg = require('../lib/lib.js').getStatusMsg;

class BattlefieldHandler {
  constructor(){
    
  }
  setBattlefield(req,res){
    let game = req.app.game;
    let playerId = req.params.playerId;
    let placedPos = req.body;
    if (validator.isValidData(playerId, placedPos)) {
      game.setBattlefieldFor(playerId, placedPos);
      res.end();
      return;
    }
    res.status(206).send('pieces or location missing!');
  }
  getBattlefield(req,res){
    let game = req.app.game;
    let sessionId = req.cookies.sessionId;
    let playerId = game.getPlayerIndexBy(sessionId);
    let battlefieldPos = game.getBattlefieldFor(playerId);
    let turnMsg = game.getTurnMessage(playerId);
    let killedPieces = game.getKilledPieces();
    let status = game.getGameStatus();
    status = getStatusMsg(sessionId,status);
    res.cookie('gameStatus', status.gameOver);
    if(status.gameOver){
      battlefieldPos = game.revealBattlefieldFor(playerId);
    }
    let respond = {
      'battlefield': battlefieldPos,
      'turnMsg': turnMsg,
      'killedPieces': killedPieces,
      'status':status
    };
    res.send(JSON.stringify(respond));
  }
  updateBattlefield(req,res){
    let game = req.app.game;
    let sessionId = req.cookies.sessionId;
    let location = req.body.location;
    let playerId = game.getPlayerIndexBy(sessionId);
    if (game.isCurrentPlayer(playerId)) {
      game.updatePieceLocation(location);
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