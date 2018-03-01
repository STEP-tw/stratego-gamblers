const getFrequency = require('./lib.js').getFrequency;
const isEquivalent=require('./lib.js').isEquivalent;

const isValidData = function(playerId,placedPos,gameType='quickGame'){
  let placedPieces = getPlacedPieces(placedPos);
  return isValidPlayerId(playerId) &&
    hasAllPlayingPiece(gameType,placedPos) &&
    hasValidPos(playerId,placedPos);
};

const isValidPlayerId = playerId=>playerId==0 || playerId==1;

const getPlacedPieces = placedPos=>Object.values(placedPos);

const getAllPieces = gameType=>{
  let playingPieces = {
    quickGame:{'F':1,'B':2,'2':2,'3':2,'S':1,'10':1,'9':1}
  };
  return playingPieces[gameType];
};

const hasAllPlayingPiece = (gameType,placedPos)=>{
  let allPieces = getAllPieces(gameType);
  let placedPieces = getPlacedPieces(placedPos);
  let pieceCounts = getFrequency(placedPieces);
  return isEquivalent(allPieces,pieceCounts);
};

const hasValidPos = (playerId,placedPos)=>{
  let piecePos = Object.keys(placedPos);
  let validPos = getValidPos(playerId);
  return piecePos.every(pos=>validPos.includes(pos));
};

const getArmyPos = (initRow,cols)=>{
  let pos = [];
  for (let row=initRow; row<initRow+4; row++) {
    for(let col=0; col<cols; col++) {
      pos.push(`${row}_${col}`);
    }
  }
  return pos;
};

const redArmyPos = ()=>getArmyPos(0,10);

const blueArmyPos = ()=>getArmyPos(6,10);

const getValidPos = playerId=>{
  let validPos = {
    0:redArmyPos(),
    1:blueArmyPos()
  };
  return validPos[playerId];
};
exports.isValidData = isValidData;
