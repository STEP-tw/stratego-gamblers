const Piece = require('./piece.js');
class Scout extends Piece {
  constructor(){
    super();
    this.id = '2';
    this.name = 'Scout';
    this.rank = 2;
  }
}
module.exports = Scout;
