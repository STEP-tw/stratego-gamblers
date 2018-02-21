const Battlefield = require('./battlefield.js');
const Player = require('./player.js');
const Pieces = require('./pieces.js');

class Game {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.currentPlayerId = 0;
    this.battlefield = new Battlefield();
    this.pieces = new Pieces();
    this.gameType = 'quickGame';
  }
  getId() {
    return this.id;
  }
  getPlayers() {
    return this.players;
  }
  addPlayer(playerName, id, color) {
    let player = new Player(playerName, id, color);
    this.players.push(player);
    return player;
  }
  setBattlefieldFor(playerId, placedArmyPos) {
    this.createPiecesFor();
    this.battlefield.setFieldFor(playerId, this.pieces, placedArmyPos);
  }
  getPlayerName(teamColor) {
    let players = this.players;
    if (teamColor == "red") {
      return players[0].getName();
    }
    return players[1].getName();
  }
  haveBothPlayersJoined() {
    let numberOfPlayers = this.players.length;
    return numberOfPlayers == 2;
  }
  createPiecesFor() {
    this.pieces.loadPieces(this.gameType);
  }
  areBothPlayerReady() {
    return this.battlefield.areBothArmyDeployed();
  }
  getBattlefieldFor(playerId) {
    let armyPos = this.battlefield.getArmyPos(playerId);
    let opponentPos = this.battlefield.getOpponentPos(playerId);
    let lakePos = this.battlefield.getLakePos();
    opponentPos.forEach(pos => {
      armyPos[pos] = 0;
    });
    lakePos.forEach(pos => {
      armyPos[pos] = 'X';
    });
    return armyPos;
  }
  getPotentialMoves(playerId, pieceLoc) {
    let battlefield = this.battlefield;
    return battlefield.getPotentialMoves(playerId, pieceLoc);
  }
  getPlayerColorBy(playerId) {
    let players = this.getPlayers();
    let player = players.find(player => player.id == playerId);
    return player.getColor();
  }
  getPlayerIndexBy(playerId) {
    let players = this.getPlayers();
    return players.findIndex(player => player.id == playerId);
  }
  isCurrentPlayer(playerId){
    return this.currentPlayerId==playerId;
  }
  getCurrentPlayer(){
    let currentPlayerId = this.currentPlayerId;
    let player = this.players[currentPlayerId];
    return player.getName();
  }
  updatePieceLocation(location){
    if(this.battlefield.hasLastSelectedLoc()){
      this.battlefield.updateLocation(this.currentPlayerId,location);
      this.changeCurrentPlayer();
      return ;
    }
    this.battlefield.addAsLastSelectedLoc(this.currentPlayerId,location);
  }
  changeCurrentPlayer(){
    this.currentPlayerId = (1 - this.currentPlayerId); 
  }
}
module.exports =Game;
