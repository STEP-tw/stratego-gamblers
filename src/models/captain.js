const Piece=require('./piece.js');
class Captain extends Piece {
  constructor(){
    super();
    this.id = '6';
    this.name = 'Captain';
    this.rank = 6;
  }
}
module.exports = Captain;