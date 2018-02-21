const filterFrom = require("../lib/lib.js").filterFrom;
const filterNotInAmong = require("../lib/lib.js").filterNotInAmong;

class Battlefield {
  constructor(){
    this.allPositions = [];
    this.placedPositions = {};
    this.lakeArea = ['5_2','5_3','4_2','4_3','5_6','5_7','4_6','4_7'];
    this.battlePositions = {};
    this.selectedPos = '';
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
  getPiece(playerId, pieceLoc){
    return this.battlePositions[playerId][pieceLoc];
  }
  getAttackMovesFor(playerId, pieceLoc){
    let opponentPos = this.getOpponentPos(playerId);
    let piece = this.getPiece(playerId, pieceLoc);
    let neighbourPositions = piece.getPotentialMove(pieceLoc);
    let isAttackingMove = filterFrom(opponentPos);
    return neighbourPositions.filter(isAttackingMove);
  }
  getFreeMoves(playerId, pieceLoc){
    let piece = this.getPiece(playerId, pieceLoc);
    let playerPos = Object.keys(this.getArmyPos(playerId));
    let attackingMoves = this.getAttackMovesFor(playerId, pieceLoc);
    let neighbourPositions = piece.getPotentialMove(pieceLoc);
    let isFreeMove = filterNotInAmong(playerPos, attackingMoves,this.lakeArea);
    return neighbourPositions.filter(isFreeMove);
  }
  getLakePos(){
    return this.lakeArea;
  }
  getPotentialMoves(playerId, pieceLoc){
    let piece = this.getPiece(playerId,pieceLoc);
    if(!piece){
      return {};
    } 
    let freeMoves = this.getFreeMoves(playerId, pieceLoc);
    let attackMoves = this.getAttackMovesFor(playerId, pieceLoc);
    return {freeMoves: freeMoves, attackMoves: attackMoves};
  }
  hasLastSelectedLoc(){
    return this.selectedPos;
  }
  addAsLastSelectedLoc(playerId,pos){
    let piece = this.getPiece(playerId,pos);
    if(piece && piece.isMovable()){
      this.selectedPos = pos;
      return true;
    }
  }
  updateLocation(playerId,pieceLoc){
    if(this.isFreeMove(playerId,pieceLoc)){
      this.replacePieceLoc(playerId,pieceLoc);
      return true;
    }
  }
  isFreeMove(playerId,pieceLoc){
    let freeMoves = this.getFreeMoves(playerId,this.selectedPos);
    return freeMoves.includes(pieceLoc);
  }
  replacePieceLoc(playerId,pieceLoc){
    let piece = this.getPiece(playerId,this.selectedPos);
    this.battlePositions[playerId][pieceLoc] = piece;
    delete this.battlePositions[playerId][this.selectedPos];
    this.removeSelectedPos();
  }
  removeSelectedPos(){
    this.selectedPos = false;
  }
  getEmptyPositions(armyPos){
    return this.allPositions.filter(pos=>!armyPos[pos]);
  }
  addPosition(pos){
    this.allPositions.push(pos);
  }
}
module.exports = Battlefield;
