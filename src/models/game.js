const Battlefield = require('./battlefield.js');
const Player = require('./player.js');
const Pieces=require('./pieces.js');
let team = 'red';
class Game {
  constructor(id){
    this.id=id;
    this.players = [];
    this.currentPlayerId = 0;
    this.battlefield = new Battlefield();
    this.pieces = new Pieces();
    this.gameType = 'quickGame';
  }
  getId(){
    return this.id;
  }
  getPlayers(){
    return this.players;
  }
  addPlayer(playerName,id,color){
    let player=new Player(playerName,id,color);
    this.players.push(player);
    return player;
  }
  setBattlefieldFor(playerId,placedArmyPos){
    this.createPiecesFor(team);
    this.battlefield.setFieldFor(playerId,this.pieces,placedArmyPos);
  }
  getPlayerName(teamColor) {
    let players = this.players;
    if(teamColor == "red") {
      return players[0].getName();
    }
    return players[1].getName();
  }
  haveBothPlayersJoined(){
    let numberOfPlayers = this.players.length;
    return numberOfPlayers == 2;
  }
  createPiecesFor(){
    this.pieces.loadPieces(this.gameType,team);
  }
  areBothPlayerReady(){
    return this.battlefield.areBothArmyDeployed();
  }
  getBattlefieldFor(playerId){
    let armyPos = this.battlefield.getArmyPos(playerId);
    let opponentPos = this.battlefield.getOpponentPos(playerId);
    opponentPos.forEach(pos=>{
      armyPos[pos]=0;
    });
    return armyPos;
  }
  getPotentialMoves(playerId, pieceLoc) {

  }
}
module.exports =Game;
