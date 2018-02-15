const Player = require('./player.js');
class Game {
  constructor(id) {
    this.id=id;
    this.playerId=0;
    this.players=[];
  }
  getId(){
    return this.id;
  }
  addPlayer(playerName){
    let id=this.playerId;
    let player=new Player(playerName,id);
    this.players.push(player);
    this.playerId++;
    return player;
  }
}
module.exports=Game;
