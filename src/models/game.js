const Battlefield = require('./battlefield.js');
const Pieces=require('./pieces.js');
let team = 'red';
class Game {
  constructor(){
    this.players = [];
    this.currentPlayerId = 0;
    this.battlefield = new Battlefield();
    this.pieces = new Pieces();
  }
  setBattlefieldFor(playerId,placedArmyPos){
    this.battlefield.setField(this.pieces,placedArmyPos);
  }
  createPiecesFor(gameType='quickGame'){
    this.pieces.loadPieces(gameType,team);
  }
}
module.exports =Game;