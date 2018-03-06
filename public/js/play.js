const generateCell = (id) => {
  let cell = document.createElement("td");
  if (id < 10) {
    id = `0_${id}`;
  }
  cell.id = id;
  return cell;
};

const getClassFor = (pieceID) => {
  let pieces = {
    'B': 'bomb',
    'F': 'flag',
    'S': 'spy',
    'O': 'opponent',
    'X': 'lake',
    '2': 'scout',
    '3': 'miner',
    '4':'sergeant',
    '5':'lieutenant',
    '6':'captain',
    '7':'major',
    '8':'colonel',
    '9': 'general',
    '10': 'marshal',
    'O_B': 'bomb-O',
    'O_F': 'flag-O',
    'O_S': 'spy-O',
    'O_2': 'scout-O',
    'O_3': 'miner-O',
    'O_4':'sergeant-O',
    'O_5':'lieutenant-O',
    'O_6':'captain-O',
    'O_7':'major-O',
    'O_8':'colonel-O',
    'O_9': 'general-O',
    'O_10': 'marshal-O'
  };
  return pieces[pieceID];
};

const highlightMoves = (potentialMoves) => {
  potentialMoves.freeMoves.forEach(pos=>{
    addToClassList(pos,'free-move');
  });
  potentialMoves.attackMoves.forEach(pos=>{
    addToClassList(pos,'attacking-move');
  });
};

const removeHighlight = (moves) => {
  if (moves) {
    moves = moves.attackMoves.concat(moves.freeMoves);
    moves.forEach(function(posID) {
      removeFromClassList(posID,'attacking-move');
      removeFromClassList(posID,'free-move');
    });
  }
};

let potentialMoves;

const getLocation = (event) => {
  let target = event.target;
  if (target.tagName == 'IMG') {
    target = target.parentNode;
  }
  let postData = `location=${target.id}`;
  const reqListener = function() {
    if (this.responseText) {
      removeHighlight(potentialMoves);
      potentialMoves = JSON.parse(this.responseText);
      return highlightMoves(potentialMoves);
    }
    setTimeout(() => {
      removeHighlight(potentialMoves);
    }, 500);
  };
  const onFail = function() {};
  doXhr('/selectedLoc', 'POST', reqListener, postData, onFail);
};

const drawBattlefield = (containerId,numOfRows,numOfCols,initialID,idGrowth)=>{
  drawGrid(containerId, numOfRows, numOfCols, initialID, idGrowth);
  let grid = document.getElementById(containerId);
  grid.addEventListener('click', getLocation);
};

const appendImage = (baseCell, id, imgSrcDirectory) => {
  let basePosition = document.getElementById(baseCell.id);
  let classForPieceId = getClassFor(id);
  if (!basePosition.classList.contains('attacking-move')) {
    basePosition.removeAttribute('class');
  }
  if (basePosition.classList.contains('attacking-move')) {
    basePosition.classList.add('attacking-move');
    return basePosition.classList.add(classForPieceId);
  }
  basePosition.className = classForPieceId;
};

const updateEmptyCell = (cell) => {
  if (cell.className) {
    if (cell.classList.contains('free-move')) {
      cell.className = 'free-move';
      return;
    }
    cell.removeAttribute('class');
  }
};

const showBattlefield = (battlefield, imgSrcDirectory) => {
  let locations = Object.keys(battlefield);
  locations.forEach(function(location) {
    let cell = document.getElementById(location);
    if (battlefield[location] == "E") {
      return updateEmptyCell(cell);
    }
    appendImage(cell, battlefield[location], imgSrcDirectory);
  });
};

const sureToLeave = () => {
  document.getElementById('leave').style.display = 'block';
};

const hidePopup = () => {
  document.getElementById('leave').style.display = 'none';
};

const rematch = () => {
  document.getElementById('leave-battle').style.display = 'none';
  let playAgain = document.querySelector('#play-again');
  playAgain.style.display = 'block';
  document.getElementById("turn-msg").style.display = 'none';
  let grid = document.querySelector("#battlefield-table");
  grid.removeEventListener('click', getLocation);
};

const announceWinner = (gameData) => {
  if(!gameData.winner){
    document.querySelector('.draw').style.display = 'block';
  }else{
    document.querySelector(`.${gameData.winner}`).style.display = 'block';
  }
};

const getFirstCellId = function(team) {
  let firstRow = document.querySelector(`#${team}`).childNodes[1];
  return firstRow.childNodes[0].id;
};

const incrementId = function(id) {
  let next = +(id.split('_').join(''))+1;
  return next.toString().split('').join('_');
};

const getHoriPath = function(initial, last) {
  let path = [];
  let prevPos = initial.yCor;
  let currentPos = last.yCor;
  do {
    path.push(`${initial.xCor}_${prevPos}`);
    if (prevPos < currentPos) {
      prevPos++;
    } else {
      prevPos--;
    }
  } while (currentPos != prevPos);
  return path;
};

const getVertPath = function(initial, last) {
  let path = [];
  let prevPos = initial.xCor;
  let currentPos = last.xCor;
  do {
    path.push(`${prevPos}_${initial.yCor}`);
    if (prevPos < currentPos) {
      prevPos++;
    } else {
      prevPos--;
    }
  } while (currentPos != prevPos);
  return path;
};

const getCoordinate = function(id) {
  return {
    xCor: +id[0],
    yCor: +id[2]
  };
};

const isSameRow = function(first, second) {
  return first.xCor == second.xCor;
};

const getPath = function(positions) {
  let initial = positions[0];
  let last = positions[1];
  let prev = getCoordinate(initial);
  let current = getCoordinate(last);
  if (isSameRow(prev, current)) {
    return getHoriPath(prev, current);
  }
  return getVertPath(prev, current);
};

const updateKilledPieces = function(cellId,pieceId,count,team){
  let pieceClass = getClassFor(team+pieceId);
  document.getElementById(cellId).className = pieceClass;
  addToClassList(cellId,'count');
  setText(cellId,count);
};

const showCapturedArmy = function(army, team, cellId) {
  let killedPieces = Object.keys(army);
  killedPieces.forEach(pieceId => {
    let count = army[pieceId];
    updateKilledPieces(cellId,pieceId,count,team);
    cellId = incrementId(cellId);
  });
};

const showKilledPieces = (killedPieces, myArmy, oppArmy) => {
  let troopsLost = killedPieces[myArmy];
  let troopsCaptured = killedPieces[oppArmy];
  let firstRedCell = getFirstCellId('troops-lost');
  let firstBlueCell = getFirstCellId('troops-captured');
  showCapturedArmy(troopsLost, '', firstRedCell);
  showCapturedArmy(troopsCaptured, 'O_', firstBlueCell);
};

const updateClass = (positions,action)=>{
  let path = getPath(positions);
  path.forEach((pos) => {
    action(pos,'start-move');
  });
  action(positions[1],'last-move');
};

const highlightFreeMoves = (updatedLocs) => {
  updateClass(updatedLocs,addToClassList);
};

let freeMoves = [];

const deemphasizeFreeMoves = () => {
  if (freeMoves.length > 0) {
    updateClass(freeMoves,removeFromClassList);
  }
};

const updateBattlefield = (gameData, myArmy, oppArmy) => {
  let status = gameData.status;
  let battlefield = gameData.battlefield;
  showBattlefield(battlefield, myArmy);
  if(!status){
    return;
  }
  let killedPieces = gameData.killedPieces;
  showKilledPieces(killedPieces, myArmy, oppArmy);
  if (isGameOver(status)) {
    announceResult(status,myArmy,oppArmy);
    return;
  }
  showTurn(gameData.turnMsg);
};

const changePosition = function(positions){
  let startPos = positions[0];
  let piece = document.getElementById(startPos);
  let pieceClass = piece.className;
  if(pieceClass){
    let secondPos = positions[1];
    let newLoc = document.getElementById(secondPos);
    newLoc.className = pieceClass;
    piece.removeAttribute('class');
  }
};

const getFirstEmptyCell = function(table){
  let firstCellId = table.querySelector('tr td:first-child').id;
  let firstEmptyCell;
  do {
    firstEmptyCell = table.querySelector(`tr [id="${firstCellId}"]`);
    firstCellId = incrementId(firstCellId);
  } while (!firstEmptyCell.innerText=="");
  return firstEmptyCell;
};

const updateTroops = function(pieceClass,capturedTroops){
  let capturedPiece = capturedTroops.querySelector(`.${pieceClass}`);
  if(capturedPiece){
    ++capturedPiece.innerText;
    return;
  }
  let firstEmptyCell = getFirstEmptyCell(capturedTroops);
  firstEmptyCell.className = pieceClass;
  firstEmptyCell.classList.add('count');
  firstEmptyCell.innerText=1;
};

const updateKilledPieceCount = function(killedPieces){
  let lostTroop = document.getElementById('troops-lost');
  let capturedTroops = document.getElementById('troops-captured');
  killedPieces.forEach(killedPiece=>{
    let piece = document.getElementById(killedPiece);
    let pieceClass = piece.className.split(' ')[0];
    if(pieceClass.endsWith('-O')){
      updateTroops(pieceClass,capturedTroops);
      return;
    }
    updateTroops(pieceClass,lostTroop);
  });
};

const updateBattlePosition = function(killedPiecesPos,movePositions){
  if(killedPiecesPos.length==2){
    document.getElementById(killedPiecesPos[0]).removeAttribute('class');
    document.getElementById(killedPiecesPos[1]).removeAttribute('class');
    return;
  }
  let killPiecePos = movePositions.find(pos=>pos==killedPiecesPos[0]);
  document.getElementById(killPiecePos).removeAttribute('class');
  if(killPiecePos == movePositions[1]){
    let pieceClass = document.getElementById(movePositions[0]).className;
    addToClassList(killPiecePos,pieceClass);
    removeFromClassList(killPiecePos,'start-move');
    document.getElementById(movePositions[0]).removeAttribute('class');
  }
};

const revealBattlePiece = function(revealPiece){
  let revealPos = revealPiece.loc;
  let pieceClass = getClassFor(revealPiece.pieceId);
  document.getElementById(revealPos).className = pieceClass;
};

const hideBattlePiece = function(revealedPieces){
  revealedPieces.forEach(revealPiece=>{
    let piece = document.getElementById(revealPiece);
    if(!piece){
      return;
    }
    let pieceClass = piece.className;
    if(pieceClass.endsWith('-O')){
      piece.removeAttribute('class');
      piece.className ='opponent';
    }
  });
};

const showRevealedBattlefield = function(myArmy,oppArmy){
  let reqListener = function() {
    let gameData = JSON.parse(this.responseText);
    updateBattlefield(gameData, myArmy, oppArmy);
  };
  doXhr('/revealedBattlefield', 'POST', reqListener, null, () => {});
};

const showTurn = (turnMsg) => {
  if(turnMsg.includes('You')){
    addToClassList('turn-msg','your-turn');
  }else {
    removeFromClassList('turn-msg','your-turn');
  }
  setText('turn-msg',turnMsg);
};

const isFreeMove = (gameData) => {
  return gameData.moveType=='freeMove' && gameData.updatedLocs.length>0;
};

const updateFreeMoves = (freeMoves) => {
  changePosition(freeMoves);
  highlightFreeMoves(freeMoves);
};

const isBattleMove = (gameData) => {
  return gameData.moveType=='battle' && gameData['killedPieces'].length>0;
};

const updateBattleMoves = (revealPiece,killedPieces,updatedLocs) => {
  revealBattlePiece(revealPiece);
  setTimeout(()=>{
    updateKilledPieceCount(killedPieces);
    updateBattlePosition(killedPieces,updatedLocs);
    hideBattlePiece(updatedLocs);
  },1000);
};

const isGameOver = (status) => {
  return status.gameOver;
};

const announceResult = (status,myArmy,oppArmy) => {
  setTimeout(()=>{
    showRevealedBattlefield(myArmy,oppArmy);
    announceWinner(status);
  },1000);
  clearInterval(interval);
  rematch();
};

const updateChanges = (gameData, myArmy, oppArmy) => {
  let status = gameData.status;
  showTurn(gameData.turnMsg);
  deemphasizeFreeMoves(gameData.updatedLocs);
  if (isFreeMove(gameData)) {
    freeMoves = gameData.updatedLocs;
    updateFreeMoves(freeMoves);
  }else if(isBattleMove(gameData)){
    let revealPiece = gameData.revealPiece;
    let killedPieces = gameData.killedPieces;
    let updatedLocs = gameData.updatedLocs;
    updateBattleMoves(revealPiece,killedPieces,updatedLocs);
  }
  if (isGameOver(status)) {
    announceResult(status,myArmy,oppArmy);
  }
};

let interval;
const initiatePolling = function(myArmy,oppArmy){
  const applyChanges = function(){
    if(this.responseText){
      let gameData = JSON.parse(this.responseText);
      updateChanges(gameData,myArmy,oppArmy);
    }
  };
  let callBack =() => {
    doXhr('/battlefieldChanges', 'POST', applyChanges, null, () => {});
  };
  interval = setInterval(callBack, 1000);
};

const setBattlefield = function(myArmy, oppArmy) {
  let reqListener = function() {
    let gameData = JSON.parse(this.responseText);
    updateBattlefield(gameData, myArmy, oppArmy);
    initiatePolling(myArmy,oppArmy);
  };
  doXhr('/battlefield', 'POST', reqListener, null, () => {});
};
