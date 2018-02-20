const Piece=require('./piece.js');
class General extends Piece {
  constructor(){
    super();
    this.id = '9';
    this.name = 'General';
    this.rank = 9;
  }
}
module.exports = General;