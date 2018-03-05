const Battlefield = require('./battlefield.js');
const Player = require('./player.js');
const Pieces = require('./pieces.js');
const getSymbolForPos=require('../lib/lib.js').getSymbolForPos;
const getAllPieces = require('../lib/validate.js').getAllPieces;
class Game {
  constructor(id) {
    this.id = id;
    this.players = [];
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
  getPlayers() {
    return this.players;
  }
  loadPieces(){
    this.pieces.loadPieces();
  }
  getKilledPieces(){
    let redCapturedArmy = this.players[0].getKilledPieces();
    let blueCapturedArmy = this.players[1].getKilledPieces();
    return {redArmy:redCapturedArmy,blueArmy:blueCapturedArmy};
  }
  addPlayer(playerName, id, color) {
    let player = new Player(playerName, id, color);
    this.players.push(player);
    return player;
  }
  setBattlefieldFor(playerId, placedArmyPos) {
    let player = this.players[playerId];
    this.battlefield.setFieldFor(playerId, this.pieces, placedArmyPos);
    player.addPieces(this.pieces,this.gameType);
  }
  getPlayer(teamColor,player) {
    let players = this.players;
    let teams = {
      'red' : 0,
      'blue' : 1
    };
    let playerLoc = (teams[teamColor]+player)%2;
    return players[playerLoc].getName();
  }
  getPlayerName(teamColor) {
    return this.getPlayer(teamColor,0);
  }
  getOpponentName(teamColor){
    return this.getPlayer(teamColor,1);
  }
  haveBothPlayersJoined() {
    let numberOfPlayers = this.players.length;
    return numberOfPlayers == 2;
  }
  areBothPlayerReady() {
    return this.battlefield.areBothArmyDeployed();
  }
  getBattlefieldFor(playerId) {
    let armyPos = this.battlefield.getArmy(playerId);
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
    let playerId = this.currentPlayerId;
    let isLocationUpdated = false;
    if(battlefield.hasLastSelectedLoc()){
      isLocationUpdated = battlefield.updateLocation(playerId,location);
    }
    if(isLocationUpdated){
      this.updateTimeStamp();
      this.changeCurrentPlayer();
      this.updatePlayerPieces();
      this.updateGameStatus();
      battlefield.removeSelectedPos();
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
    battleResults.forEach(result=>{
      let deadPieceId = result.killedPiece.id;
      this.players[result.playerId].kill(deadPieceId);
    });
    this.battlefield.clearBattleResult();
  }
  updateGameStatus(){
    let lostPlayers = this.players.filter(player=>{
      return player.hasLost();
    });
    if(lostPlayers.length>0){
      this.gameOver = true;
      this.setWinner(lostPlayers);
    }
  }
  setWinner(lostPlayers){
    if(this.isGameDrawn(lostPlayers)){
      return;
    }
    let loser = lostPlayers[0];
    let winner = this.players.find(player=>player!=loser);
    this.winner = winner.getId();
  }
  isGameDrawn(lostPlayers){
    return lostPlayers.length==2;
  }
  getGameStatus(){
    return {
      gameOver:this.gameOver,
      winner:this.winner
    };
  }
  revealBattlefieldFor(sessionId){
    let playerId = this.getPlayerIndexBy(sessionId);
    let revealArmy = this.battlefield.revealArmyFor(playerId);
    let lakePos = this.battlefield.getLakePos();
    revealArmy = getSymbolForPos(revealArmy,lakePos,'X');
    let emptyPos = this.battlefield.getEmptyPositions(revealArmy);
    let completeBattlefield = getSymbolForPos(revealArmy,emptyPos,'E');
    let boardInfo = {
      'battlefield': completeBattlefield
    };
    return boardInfo;
  }
  getBoardFor(sessionId){
    let playerId = this.getPlayerIndexBy(sessionId);
    let battlefieldPos = this.getBattlefieldFor(playerId);
    let revealPiece = this.battlefield.getRevealPiece(playerId);
    let killedPieces = this.getKilledPieces();
    let boardInfo = {
      'battlefield': battlefieldPos,
      'killedPieces': killedPieces
    };
    return boardInfo;
  }
  getChanges(sessionId){
    let playerId = this.getPlayerIndexBy(sessionId);
    let status = this.getGameStatus();
    let turnMsg = this.getTurnMessage(playerId);
    let revealPiece = this.battlefield.getRevealPiece(playerId);
    let killedPieces = this.battlefield.getKilledPieces();
    this.battlefield.resetKilledPieces();
    let updatedLocs = this.battlefield.getUpdatedLocations();
    let moveType = this.battlefield.getMoveType();
    let gameChanges ={
      'updatedLocs':updatedLocs,
      'turnMsg': turnMsg,
      'killedPieces': killedPieces,
      'revealPiece':revealPiece,
      'moveType':moveType,
      'status': status
    };
    return gameChanges;
  }
  quit(team){
    let winner = this.getOpponentName(team);
    this.gameOver = 'quit';
    let winningPlayer = this.players.find(player=>player.name==winner);
    this.winner = winningPlayer.getId();
    this.updateTimeStamp();
  }
  updateTimeStamp(){
    this.timeStamp = new Date().getTime();
  }
  isBoardUpdated(timeStamp){
    return this.timeStamp > timeStamp;
  }
  getArmy(){
    return getAllPieces(this.gameType);
  }
}
module.exports =Game;
