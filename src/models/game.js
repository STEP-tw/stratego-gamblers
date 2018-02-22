const Battlefield = require('./battlefield.js');
const Player = require('./player.js');
const Pieces = require('./pieces.js');
const getSymbolForPos=require('../lib/lib.js').getSymbolForPos;
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
    let player = this.players[playerId];
    this.battlefield.setFieldFor(playerId, this.pieces, placedArmyPos);
    let pieces = this.battlefield.getPiecesOf(playerId);
    player.addPieces(pieces);
  }
  getPlayerName(teamColor) {
    let players = this.players;
    if (teamColor == "red") {
      return players[0].getName();
    }
    return players[1].getName();
  }
  getOpponentName(teamColor){
    let players = this.players;
    if (teamColor == "blue") {
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
    armyPos = getSymbolForPos(armyPos,opponentPos,'O');
    armyPos = getSymbolForPos(armyPos,lakePos,'X');
    let emptyPos = this.battlefield.getEmptyPositions(armyPos);
    armyPos = getSymbolForPos(armyPos,emptyPos,'E');
    return armyPos;
  }
  getPotentialMoves(pieceLoc) {
    let battlefield = this.battlefield;
    return battlefield.getPotentialMoves(this.currentPlayerId, pieceLoc);
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
    let battlefield = this.battlefield;
    let isUpdatedLoc = false;
    if(battlefield.hasLastSelectedLoc()){
      isUpdatedLoc = battlefield.updateLocation(this.currentPlayerId,location);
    }
    if(isUpdatedLoc){
      this.changeCurrentPlayer();
      return ;
    }
    battlefield.addAsLastSelectedLoc(this.currentPlayerId,location);
  }
  changeCurrentPlayer(){
    this.currentPlayerId = (1 - this.currentPlayerId);
  }
  createBattlefield(){
    for (let row=0; row<=9; row++) {
      for (let col=0; col<=9; col++) {
        this.battlefield.addPosition(`${row}_${col}`);
      }
    }
  }
  getTurnMessage(playerIndex){
    if(playerIndex==this.currentPlayerId){
      return 'Your turn';
    }
    return 'Opponent\'s turn';
  }
}
module.exports =Game;
