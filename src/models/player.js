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
  hasLost(){
    let deadPieces = this.deadPieces;
    let deadFlag = deadPieces.find(piece => piece.id == "F");
    if (deadFlag){
      return true;
    }
    return false;
  }
}
module.exports=Player;
