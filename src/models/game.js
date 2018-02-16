const Battlefield = require('./battlefield.js');
const Pieces=require('./pieces.js');
let team = 'red';
let playerId = 0;
class Game {
  constructor(){
    this.players = [];
    this.currentPlayerId = 0;
    this.battlefield = new Battlefield();
    this.pieces = new Pieces();
    this.playerCounts = 0;
    this.readyStatus = false;
  }
  setBattlefieldFor(playerId,placedArmyPos){
    this.createPiecesFor('quickGame',team);
    this.battlefield.setField(this.pieces,placedArmyPos);
  }
  createPiecesFor(gameType){
    this.pieces.loadPieces(gameType,team);
  }
  updateStatus(){
    this.playerCounts++;
    if(this.playerCounts==2){
      this.readyStatus = true;
    }
  }
}
module.exports =Game;