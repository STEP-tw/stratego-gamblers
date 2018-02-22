class Player {
  constructor(name,id,color) {
    this.name=name;
    this.id=id;
    this.color=color;
    this.livePieces=[];
    this.deadPieces=[];
  }
  getId(){
    return this.id;
  }
  getColor(){
    return this.color;
  }
  getName(){
    return this.name;
  }
  addPieces(pieces){
    this.livePieces = pieces;
  }
  getPieceIndex(pieceId){
    return this.livePieces.findIndex(piece => piece.id == pieceId);
  }
  kill(pieceId){
    let pieceIndex = this.getPieceIndex(pieceId);
    let deadPiece = this.livePieces.splice(pieceIndex,1);
    this.deadPieces.push(deadPiece[0]);
  }
  hasFlagCaptured(){
    let deadPieces = this.deadPieces;
    return deadPieces.find(piece => piece.id == "F");
  }
  hasLost(){
    return this.hasFlagCaptured() || !this.hasAnyMovingPieceLeft();
  }
  hasAnyMovingPieceLeft(){
    let livePieces = this.livePieces;
    return livePieces.some(function(piece){
      return piece.isMovable();
    });
  }
}
module.exports=Player;
