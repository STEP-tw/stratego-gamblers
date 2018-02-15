class Battlefield {
  constructor(){
    this.placedPositions = [];
    this.lakeArea = [];
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
    let position={};
    position[pos]=piece;
    this.placedPositions.push(position);
  }
  getPlacedPositions(){
    return this.placedPositions;
  }

}
module.exports = Battlefield;