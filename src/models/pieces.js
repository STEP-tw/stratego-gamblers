const Flag=require('./flag.js');
const Bomb=require('./bomb.js');
const Marshal=require('./marshal.js');
const General=require('./general.js');
const Scout=require('./scout.js');
const Miner=require('./miner.js');
const Spy=require('./spy.js');

class Pieces {
  constructor(){
    this.pieces =[];
  }
  loadPieces(gameType,team){
    this.pieces.push(new Flag(team));
    this.pieces.push(new Bomb(team));
    this.pieces.push(new Marshal(team));
    this.pieces.push(new Miner(team));
    this.pieces.push(new Spy(team));
    this.pieces.push(new Scout(team));
    this.pieces.push(new General(team));
  }
  getPiece(pieceId){
    return this.pieces.find(piece=>piece.id==pieceId);
  }
}

module.exports = Pieces;
