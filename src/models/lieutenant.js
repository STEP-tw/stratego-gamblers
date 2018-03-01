const Piece=require('./piece.js');
class Lieutenant extends Piece {
  constructor(){
    super();
    this.id = '5';
    this.name = 'Lieutenant';
    this.rank = 5;
  }
}
module.exports = Lieutenant;