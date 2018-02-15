class Battlefield {
  constructor(){
    this.placedPositions = [];
    this.lakeArea = [];
  }
  setField(pieces,placedArmyPos){
    let allPos = Object.keys(placedArmyPos);
    allPos.forEach(pos=>{
      let piece = pieces.getPiece(pieceId);
      this.addPiece(piece,pos,placedArmyPos[pos]);
    });
  }
  addPiece(piece,pos,pieceId){
    let position={};
    position[pos]=piece;
    this.placedPositions.push(position);
  }
  getPlacedPositions(){
    return this.placedPositions;
  }

}
module.exports = Battlefield;