const Flag=require('./flag.js');
// const piecesName = ['Flag','Bomb','Marshal'];
class Pieces {
  constructor(){
    this.pieces =[];
  }
  loadPieces(gameType,team){
    this.pieces.push(new Flag(team));
  }
  getPiece(pieceId){
    return this.pieces.find(piece=>piece.id==pieceId);
  }
}

module.exports = Pieces;
