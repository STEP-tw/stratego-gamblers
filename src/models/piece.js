const Position=require('./position.js');
class Piece {
  constructor(){

  }
  isMovable(){
    return true;
  }
  getPotentialMove(pos){
    let position = new Position(pos);
    return position.getNeighbourPos();
  }
  attackedBy(attackingPiece){
    let killedPieces = {myPiece:true,opponentPiece:true};
    if(this.rank<attackingPiece.rank){
      killedPieces.myPiece = false;
    }
    if(this.rank>attackingPiece.rank){
      killedPieces.opponentPiece = false;
    }
    return killedPieces;
  }
}
module.exports = Piece;
