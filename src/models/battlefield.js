const filterFrom = function(array) {
  return function(element) {
    array.includes(element);
  };
};


class Battlefield {
  constructor(){
    this.placedPositions = {};
    this.lakeArea = ['5_2','5_3','4_2','4_3','5_6','5_7','4_6','4_7'];
    this.battlePositions = {};
  }
  setField(pieces,placedArmyPos){
    let allPos = Object.keys(placedArmyPos);
    allPos.forEach(pos=>{
      let pieceId = placedArmyPos[pos];
      let piece = pieces.getPiece(pieceId);
      this.addPiece(piece,pos);
    });
  }
  addPiece(piece,pos){
    this.placedPositions[pos] = piece;
  }
  getPlacedPositions(){
    return this.placedPositions;
  }
  setFieldFor(playerId,pieces,placedArmyPos){
    this.setField(pieces,placedArmyPos);
    this.battlePositions[playerId] = this.placedPositions;
    this.placedPositions = {};
  }
  getArmyPos(playerId){
    let armyPos = {};
    let allPos = Object.keys(this.battlePositions[playerId]);
    allPos.forEach(pos=>{
      armyPos[pos]=this.battlePositions[playerId][pos].id;
    });
    return armyPos;
  }
  getOpponentPos(playerId){
    return Object.keys(this.battlePositions[1-playerId]);
  }
  areBothArmyDeployed(){
    let battlePositions = this.battlePositions;
    return Object.keys(battlePositions).length==2;
  }
  getAttackMovesFor(playerId, pieceLoc){
    let opponentPos = this.getOpponentPos(playerId);
    let piece = this.getPiece(playerId, pieceLoc);
    let neighbourPositions = piece.getNeighbourPositions();
    let filterAttackingMoves = filterFrom(opponentPos);
    return neighbourPositions.filter(filterAttackingMoves);
  }
  getLakePos(){
    return this.lakeArea;
  }
}
module.exports = Battlefield;
