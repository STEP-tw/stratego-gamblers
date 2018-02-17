const Battlefield = require('./battlefield.js');
const Player = require('./player.js');
const Pieces=require('./pieces.js');
let team = 'red';
let currentPlayerId = 0;
class Game {
  constructor(id){
    this.id=id;
    this.players = [];
    this.currentPlayerId = 0;
    this.battlefield = new Battlefield();
    this.pieces = new Pieces();
    this.playerCounts = 0;
    this.gameType = 'quickGame';
  }
  getId(){
    return this.id;
  }
  addPlayer(playerName){
    let id=this.currentPlayerId;
    let player=new Player(playerName,id);
    this.players.push(player);
    this.currentPlayerId++;
    return player;
  }
  setBattlefieldFor(playerId,placedArmyPos){
    this.createPiecesFor(team); 
    this.battlefield.setFieldFor(playerId,this.pieces,placedArmyPos);
  }
  createPiecesFor(){
    this.pieces.loadPieces(this.gameType,team);
  }
  isBothPlayerReady(){
    return this.playerCounts==2;
  }
  hasAllPlyingPieces(playerId){
    let positions = Object.keys(this.battlefield.battlePositions[playerId]);
    let piecesCount = positions.length;
    return piecesCount==10;
  }
  updatePlayerCount(){
    this.playerCounts++;
  }
  getBattlefieldFor(playerId){
    let armyPos = this.battlefield.getArmyPos(playerId);
    let opponentPos = this.battlefield.getOpponentPos(playerId);
    opponentPos.forEach(pos=>{
      armyPos[pos]=0;
    });
    return armyPos;
  }
}
module.exports =Game;
