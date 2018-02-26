const Piece=require('./piece.js');
class Flag extends Piece {
  constructor(){
    super();
    this.id = 'F';
    this.name = 'Flag';
    this.rank = 0;
  }
  isMovable(){
    return false;
  }
  getPotentialMoves(){
    return ;
  }
}
module.exports = Flag;