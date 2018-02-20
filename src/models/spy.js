const Piece=require('./piece.js');
class Spy extends Piece {
  constructor(){
    super();
    this.id = 'S';
    this.name = 'Spy';
    this.rank = 1;
  }
}
module.exports = Spy;