class Battlefield {
  constructor(){
    this.allPositions = [];
    this.placedPositions = {};
    this.lakeArea = ['5_2','5_3','4_2','4_3','5_6','5_7','4_6','4_7'];
    this.battlePositions = {};
    this.selectedPos = '';
    this.battleResults = [];
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
  getLakePos(){
    return this.lakeArea;
  }
  getPosMap(playerId){
    let posMap = {};
    let armyPos = this.getArmyPos(playerId);
    posMap.myArmy = Object.keys(armyPos);
    posMap.opponentArmy = this.getOpponentPos(playerId);
    posMap.lakeArea = this.getLakePos();
    return posMap;
  }
  getPotentialMoves(playerId, pieceLoc){
    let piece = this.getPiece(playerId,pieceLoc);
    if(!piece){
      return {};
    }
    let posMap = this.getPosMap(playerId);
    return piece.getPotentialMoves(pieceLoc,posMap);
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
    let potentialMoves = this.getPotentialMoves(playerId,this.selectedPos);
    if(this.isFreeMove(potentialMoves,pieceLoc)){
      this.replacePieceLoc(playerId,pieceLoc);
      this.removeSelectedPos();
      return true;
    }
    if(this.isAttackMove(potentialMoves,pieceLoc)){
      this.battle(playerId,pieceLoc);
      this.removeSelectedPos();
      return true;
    }
  }
  isFreeMove(potentialMoves,pieceLoc){
    return potentialMoves.freeMoves.includes(pieceLoc);
  }
  isAttackMove(potentialMoves,pieceLoc){
    return potentialMoves.attackMoves.includes(pieceLoc);
  }
  battle(playerId,pieceLoc){
    let opponentId = 1-playerId;
    let piece = this.getPiece(playerId,this.selectedPos);
    let opponentPiece = this.getPiece(opponentId,pieceLoc);
    let killedPieces = opponentPiece.attackedBy(piece);    
    if(killedPieces.defendingPiece){
      this.setBattleResult(opponentId,opponentPiece);
      delete this.battlePositions[opponentId][pieceLoc];
    }
    if(killedPieces.attackingPiece){
      this.setBattleResult(playerId,piece);     
      delete this.battlePositions[playerId][this.selectedPos];
    } else {
      this.replacePieceLoc(playerId,pieceLoc);
    }
  }
  replacePieceLoc(playerId,pieceLoc){
    let piece = this.getPiece(playerId,this.selectedPos);
    this.battlePositions[playerId][pieceLoc] = piece;
    delete this.battlePositions[playerId][this.selectedPos];
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
  getPiecesOf(playerId){
    let battlePositions = this.battlePositions;
    return Object.values(battlePositions[playerId]);
  }
  getBattleResults(){
    return this.battleResults;
  }
  setBattleResult(playerId,piece){
    let result = {playerId:playerId,killedPiece:piece};
    this.battleResults.push(result);
  }
  clearBattleResult(){
    this.battleResults = [];
  }
}
module.exports = Battlefield;
