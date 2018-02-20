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
}
module.exports = Bomb;