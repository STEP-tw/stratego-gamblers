const Position=require('./position.js');
class Piece {
  constructor(){

  }
  isMovable(){
    return true;
  }
  getPotentialMove(pos){
    let position = new Position(pos);
    return position.getNeighbourPos();
  }
}
module.exports = Piece;
