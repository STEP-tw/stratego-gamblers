const Battlefield = require('./battlefield.js');
const Players = require('./players.js');
const Pieces = require('./pieces.js');
const getAllPieces = require('../lib/validate.js').getAllPieces;

class Game {
  constructor(id) {
    this.id = id;
    this.players = new Players();
    this.currentPlayerId = 0;
    this.battlefield = new Battlefield();
    this.pieces = new Pieces();
    this.gameType = 'quickGame';
    this.gameOver=false;
    this.winner='';
    this.timeStamp =new Date().getTime();
  }
  addGameType(type){
    this.gameType = `${type}Game`;
  }
  getGameType(){
    return this.gameType;
  }
  getId() {
    return this.id;
  }
  loadPieces(){
    this.pieces.loadPieces();
  }
  addPlayer(playerName, id, color) {
    this.players.addPlayer(playerName, id, color);
  }
  setBattlefieldFor(playerId, placedArmyPos) {
    this.battlefield.setFieldFor(playerId, this.pieces, placedArmyPos);
    this.players.addPieces(playerId,this.pieces,this.gameType);
  }
  getPlayerName(teamColor) {
    return this.players.getPlayerNameBy(teamColor);
  }
  getOpponentName(teamColor){
    return this.players.getOpponentNameBy(teamColor);
  }
  haveBothPlayersJoined() {
    return this.players.hasTwoPlayers();
  }
  areBothPlayerReady() {
    return this.battlefield.areBothArmyDeployed();
  }
  getPotentialMoves(pieceLoc) {
    let battlefield = this.battlefield;
    return battlefield.getPotentialMoves(this.currentPlayerId, pieceLoc);
  }
  getPlayerColorBy(playerId) {
    return this.players.getColor(playerId);
  }
  getPlayerIndexBy(playerId) {
    return this.players.getPlayerIndex(playerId);
  }
  isCurrentPlayer(playerId){
    return this.currentPlayerId==playerId;
  }
  updatePieceLocation(location){
    let battlefield = this.battlefield;
    let playerId = this.currentPlayerId;
    let isLocationUpdated = false;
    if(battlefield.hasLastSelectedLoc()){
      isLocationUpdated = battlefield.updateBattlefield(playerId,location);
    }
    if(isLocationUpdated){
      this.changeCurrentPlayer();
      this.updatePlayerPieces();
      this.updateGameStatus();
      battlefield.removeSelectedPos();
      this.updateTimeStamp();
      return ;
    }
    battlefield.addAsLastSelectedLoc(playerId,location);
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
  updatePlayerPieces(){
    let battleResults = this.battlefield.getBattleResults();
    this.players.addKilledPieces(battleResults);
    this.battlefield.clearBattleResult();
  }
  updateGameStatus(){
    if(this.players.hasAnyPlayerLost()){
      this.gameOver = true;
      this.setWinner();
    }
  }
  setWinner(){
    if(this.isGameDrawn()){
      return;
    }
    this.winner = this.players.getWinner();
  }
  isGameDrawn(){
    return this.players.areBothPlayersLost();
  }
  getGameStatus(){
    return {
      gameOver:this.gameOver,
      winner:this.winner
    };
  }
  getRevealedBattlefield(sessionId){
    let playerId = this.getPlayerIndexBy(sessionId);
    return this.battlefield.revealBattlefieldFor(playerId);
  }
  getBoardFor(sessionId){
    let playerId = this.getPlayerIndexBy(sessionId);
    let battlefieldPos = this.battlefield.getBattlefieldFor(playerId);
    let revealPiece = this.battlefield.getRevealPiece(playerId);
    let turnMsg = this.getTurnMessage(playerId);
    let status = this.getGameStatus();
    let killedPieces = this.players.getKilledPieces();
    let boardInfo = {
      'battlefield': battlefieldPos,
      'turnMsg': turnMsg,
      'killedPieces': killedPieces,
      'status': status
    };
    return boardInfo;
  }
  getChanges(sessionId){
    let playerId = this.getPlayerIndexBy(sessionId);
    let status = this.getGameStatus();
    let turnMsg = this.getTurnMessage(playerId);
    let revealPiece = this.battlefield.getRevealPiece(playerId);
    let killedPiecesLocs = this.battlefield.getKilledPiecesLocs();
    let updatedLocs = this.battlefield.getUpdatedLocations();
    let moveType = this.battlefield.getMoveType();
    let gameChanges ={
      'updatedLocs':updatedLocs,
      'turnMsg': turnMsg,
      'killedPieces': killedPiecesLocs,
      'revealPiece':revealPiece,
      'moveType':moveType,
      'status': status
    };
    return gameChanges;
  }
  quit(team){
    let winner = this.getOpponentName(team);
    this.gameOver = 'quit';
    let winningPlayer = this.players.getPlayerByName(winner);
    this.winner = winningPlayer.getId();
    this.updateTimeStamp();
  }
  updateTimeStamp(){
    this.timeStamp = new Date().getTime()+2000;
  }
  isBoardUpdated(){
    let timeStamp = new Date().getTime();
    return this.timeStamp > timeStamp;
  }
  getArmy(){
    return getAllPieces(this.gameType);
  }
  isOver(){
    return this.gameOver;
  }
}
module.exports =Game;
