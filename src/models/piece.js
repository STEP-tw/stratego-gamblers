const Position = require('./position.js');
class Piece {
  constructor() {

  }
  isMovable() {
    return true;
  }

  isFreePosition(position, posMap) {
    let myArmy = posMap.myArmy;
    let oppArmy = posMap.opponentArmy;
    let lake = posMap.lakeArea;
    let positions = myArmy.concat(oppArmy).concat(lake);
    return !positions.includes(position);
  }

  isOpponent(position, opponentArmy) {
    return opponentArmy.includes(position);
  }

  getPotentialMoves(pos, posMap) {
    let potentialMoves = {
      freeMoves: [],
      attackMoves: []
    };
    let position = new Position(pos);
    let neighbours = position.getNeighbourPos();
    neighbours.forEach(currentPos => {
      if (this.isFreePosition(currentPos, posMap)) {
        potentialMoves.freeMoves.push(currentPos);
      } else if (this.isOpponent(currentPos, posMap.opponentArmy)) {
        potentialMoves.attackMoves.push(currentPos);
      }
    });
    return potentialMoves;
  }
  attackedBy(attackingPiece) {
    let killedPieces = {
      myPiece: true,
      opponentPiece: true
    };
    if (this.rank < attackingPiece.rank) {
      killedPieces.myPiece = false;
    }
    if (this.rank > attackingPiece.rank) {
      killedPieces.opponentPiece = false;
    }
    return killedPieces;
  }
}
module.exports = Piece;
