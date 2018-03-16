const Player=require('./player.js');
class Players {
  constructor(){
    this.players = [];
  }
  addPlayer(name,id,color){
    let player = new Player(name, id, color);
    this.players.push(player);
  }
  getPlayer(playerId){
    return this.players[playerId];
  }
  addPieces(playerId,pieces,gameType){
    this.players[playerId].addPieces(pieces,gameType);
  }
  getPlayerNameBy(color){
    let player = this.players.find(player=>player.color==color);
    return player.name;
  }
  getOpponentNameBy(color){
    let player = this.players.find(player=>player.color!=color);
    return player.name;
  }
  getPlayerByName(name){
    return this.players.find(player=>player.name==name);
  }
  hasTwoPlayers(){
    return this.players.length == 2;
  }
  getPlayerName(playerId){
    return this.getPlayer(playerId).getName();
  }
  getColor(playerId){
    return this.getPlayer(playerId).getColor();
  }
  addKilledPieces(battleResults){
    battleResults.forEach(result=>{
      let deadPieceId = result.killedPiece.id;
      this.players[result.playerId].kill(deadPieceId);
    });
  }
  getKilledPieces(){
    let redCapturedArmy = this.players[0].getKilledPieces();
    let blueCapturedArmy = this.players[1].getKilledPieces();
    return {redArmy:redCapturedArmy,blueArmy:blueCapturedArmy};
  }
  getPlayerIndex(playerId){
    return this.players.findIndex(player => player.id == playerId);
  }
  getWinner(){
    let player = this.players.find(player=>!player.hasLost());
    return player.getId();
  }
  areBothPlayersLost(){
    return this.players.every(player=>player.hasLost());
  }
  hasAnyPlayerLost(){
    return this.players.some(player=>player.hasLost());
  }
}
module.exports = Players;
