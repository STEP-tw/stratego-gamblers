const Flag=require('./flag.js');
const Bomb=require('./bomb.js');
const Spy=require('./spy.js');
const Marshal=require('./marshal.js');
const General=require('./general.js');
const Colonel=require('./colonel.js');
const Major=require('./major.js');
const Captain=require('./captain.js');
const Lieutenant=require('./lieutenant.js');
const Sergeant=require('./sergeant.js');
const Scout=require('./scout.js');
const Miner=require('./miner.js');

class Pieces {
  constructor(){
    this.pieces =[];
  }
  loadPieces(){
    this.pieces.push(new Flag());
    this.pieces.push(new Bomb());
    this.pieces.push(new Spy());
    this.pieces.push(new Marshal());
    this.pieces.push(new General());
    this.pieces.push(new Colonel());
    this.pieces.push(new Major());
    this.pieces.push(new Captain());
    this.pieces.push(new Lieutenant());
    this.pieces.push(new Sergeant());
    this.pieces.push(new Miner());
    this.pieces.push(new Scout());
  }
  getPiece(pieceId){
    return this.pieces.find(piece=>piece.id==pieceId);
  }
}

module.exports = Pieces;
