const Piece=require('./piece.js');
class Bomb extends Piece {
  constructor(){
    super();
    this.id = 'B';
    this.name = 'Bomb';
    this.rank = 0;
  }
  isMovable(){
    return false;
  }
  attackedBy(attackingPiece){
    let killedPieces = {attackingPiece:true,defendingPiece:false};
    if(attackingPiece.rank==3){
      
      killedPieces.defendingPiece = true;
      killedPieces.attackingPiece = false;
    }
    return killedPieces; 
  }
  getPotentialMoves(){
    return ;
  }
}
module.exports = Bomb;