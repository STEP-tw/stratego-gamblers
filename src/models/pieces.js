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
  loadPieces(){
    this.pieces.push(new Flag());
    this.pieces.push(new Bomb());
    this.pieces.push(new Marshal());
    this.pieces.push(new Miner());
    this.pieces.push(new Spy());
    this.pieces.push(new Scout());
    this.pieces.push(new General());
  }
  getPiece(pieceId){
    return this.pieces.find(piece=>piece.id==pieceId);
  }
}

module.exports = Pieces;
