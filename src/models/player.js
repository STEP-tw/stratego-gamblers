const Pieces=require('./pieces');
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
  getKilledPieces(){
    return this.deadPieces.map(piece => piece.id);
  }
  addPieces(pieces,gameType){
    let pieceIds = this.getPieceIds(gameType);
    let gamePieces = this.getGamePieces(gameType);
    pieceIds.forEach(pieceId=>{
      let pieceCount = gamePieces[pieceId];
      while(pieceCount>0){
        this.livePieces.push(pieces.getPiece(pieceId));
        pieceCount--;
      }
    });
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
  getPieceIds(gameType){
    let piecesIds = {
      quickGame:['F','B','S','2','3','9','10']
    };
    return piecesIds[gameType];
  }
  getGamePieces(gameType){
    let gamePieces = {
      quickGame:{'F':1,'B':2,'2':2,'3':2,'S':1,'10':1,'9':1}
    };
    return gamePieces[gameType];
  }
}
module.exports=Player;
