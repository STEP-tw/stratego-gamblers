const Piece=require('./piece.js');
class Sergeant extends Piece {
  constructor(){
    super();
    this.id = '4';
    this.name = 'Sergeant';
    this.rank = 4;
  }
}
module.exports = Sergeant;