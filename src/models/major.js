const Piece=require('./piece.js');
class Major extends Piece {
  constructor(){
    super();
    this.id = '7';
    this.name = 'Major';
    this.rank = 7;
  }
}
module.exports = Major;