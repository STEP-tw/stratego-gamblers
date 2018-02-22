const Piece=require('./piece.js');
class Marshal extends Piece {
  constructor(){
    super();
    this.id = '10';
    this.name = 'Marshal';
    this.rank = 10;
  }
  attackedBy(attackingPiece){
    let killedPieces = {attackingPiece:true,defendingPiece:true};
    if(attackingPiece.rank==1){
      killedPieces.attackingPiece = false;      
    } else if (attackingPiece.rank<this.rank){
      killedPieces.defendingPiece = false;
    }
    return killedPieces; 
  }
}
module.exports = Marshal;