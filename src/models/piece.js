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
    let killedPieces = {attackingPiece:true,defendingPiece:true};
    if(this.rank<attackingPiece.rank){
      killedPieces.attackingPiece = false;
    }
    if(this.rank>attackingPiece.rank){
      killedPieces.defendingPiece = false;
    }
    return killedPieces;
  }
}
module.exports = Piece;
