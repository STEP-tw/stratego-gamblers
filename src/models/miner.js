const Piece=require('./piece.js');
class Miner extends Piece {
  constructor(){
    super();
    this.id = '3';
    this.name = 'Miner';
    this.rank = 3;
  }
}
module.exports = Miner;