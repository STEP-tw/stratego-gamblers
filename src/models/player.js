const Pieces=require('./pieces');
const getFrequency=require('../lib/lib.js').getFrequency;
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
    let killedPieces = this.deadPieces.map(piece => piece.id);
    return getFrequency(killedPieces);
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
      quickGame:['F','B','S','2','3','9','10'],
      fullGame:['F','B','S','10','9','8','7','6','5','4','3','2']
    };
    return piecesIds[gameType];
  }
  getGamePieces(gameType){
    let gamePieces = {
      quickGame:{'F':1,'B':2,'2':2,'3':2,'S':1,'10':1,'9':1},
      fullGame:{'F':1,'B':6,'S':1,'10':1,'9':1,'8':2,'7':3,
        '6':4,'5':4,'4':4,'3':5,'2':8}
    };
    return gamePieces[gameType];
  }
}
module.exports=Player;
