const Piece = require('./piece.js');
const Position = require('./position.js');
class Scout extends Piece {
  constructor() {
    super();
    this.id = '2';
    this.name = 'Scout';
    this.rank = 2;
  }
  isFreePosition(position, posMap) {
    let myArmy = posMap.myArmy;
    let oppArmy = posMap.opponentArmy;
    let lake = posMap.lakeArea;
    let positions = myArmy.concat(oppArmy).concat(lake);
    return !positions.includes(position);
  }

  isOpponent(position, opponentArmyPos) {
    let opponentArmy = opponentArmyPos;
    return opponentArmy.includes(position);
  }

  getPosTowards(pos, direction) {
    let position = new Position(pos);
    let directions = {
      'left': position.getAllPosLeft.bind(position),
      'right': position.getAllPosRight.bind(position),
      'top': position.getAllPosAhead.bind(position),
      'bottom': position.getAllPosBack.bind(position)
    };
    return directions[direction]();
  }

  getMovesInDirection(pos, potentialMoves, posMap, direction) {
    let allPos = this.getPosTowards(pos, direction);
    for (let index = 0; index < allPos.length; index++) {
      let currentPos = allPos[index];
      if (this.isFreePosition(currentPos, posMap)) {
        potentialMoves.freeMoves.push(currentPos);
      } else {
        if (this.isOpponent(currentPos, posMap.opponentArmy)) {
          potentialMoves.attackMoves.push(currentPos);
        }
        index = allPos.length;
      }
    }
    return potentialMoves;
  }

  getPotentialMoves(pos, posMap) {
    let potentialMoves = {
      freeMoves: [],
      attackMoves: []
    };
    this.getMovesInDirection(pos, potentialMoves, posMap, 'left');
    this.getMovesInDirection(pos, potentialMoves, posMap, 'right');
    this.getMovesInDirection(pos, potentialMoves, posMap, 'top');
    this.getMovesInDirection(pos, potentialMoves, posMap, 'bottom');
    return potentialMoves;
  }
}
module.exports = Scout;
