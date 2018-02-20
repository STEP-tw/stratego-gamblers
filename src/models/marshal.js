const Piece=require('./piece.js');
class Marshal extends Piece {
  constructor(){
    super();
    this.id = '10';
    this.name = 'Marshal';
    this.rank = 10;
  }
}
module.exports = Marshal;