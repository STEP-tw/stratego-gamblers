const Piece=require('./piece.js');
class Colonel extends Piece {
  constructor(){
    super();
    this.id = '8';
    this.name = 'Colonel';
    this.rank = 8;
  }
}
module.exports = Colonel;