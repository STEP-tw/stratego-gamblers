const doXhr = function(url, method, reqListener, data, onFailed) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function() {
    if (this.status == 200 && this.readyState == 4) {
      reqListener.call(this);
    } else {
      onFailed();
    }
  };
  if (method == 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  data ? xhr.send(data) : xhr.send();
};

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
    2: 'scout',
    3: 'miner',
    9: 'general',
    10: 'marshal',
    'O_B': 'bomb-O',
    'O_F': 'flag-O',
    'O_S': 'spy-O',
    'O_2': 'scout-O',
    'O_3': 'miner-O',
    'O_9': 'general-O',
    'O_10': 'marshal-O'
  };
  return pieces[pieceID];
};

const generateRow = (initialID, numberOfCols) => {
  let row = document.createElement("tr");
  for (let cols = 0; cols < numberOfCols; cols++) {
    let id = initialID.toString().split("").join("_");
    let cell = generateCell(id);
    row.appendChild(cell);
    initialID++;
  }
  return row;
};

const highlightMoves = (potentialMoves) => {
  potentialMoves.freeMoves.forEach(function(move) {
    let pos = document.getElementById(move);
    pos.classList.add('free-move');
  });
  potentialMoves.attackMoves.forEach(function(move) {
    let pos = document.getElementById(move);
    pos.classList.add('attacking-move');
  });
};

const removeHighlight = (moves) => {
  if (moves) {
    moves = moves.attackMoves.concat(moves.freeMoves);
    moves.forEach(function(posID) {
      let move = document.getElementById(posID);
      move.classList.remove('attacking-move');
      move.classList.remove('free-move');
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

const drawGrid = (containerId, numOfRows, numOfCols, initialID, idGrowth) => {
  let grid = document.getElementById(containerId);
  for (let rows = 0; rows < numOfRows; rows++) {
    let row = generateRow(initialID, numOfCols);
    initialID += idGrowth;
    grid.appendChild(row);
  }
  grid.addEventListener('click', getLocation);
};

const setImageAttributes = (img, src, id, height, width) => {
  img.src = src;
  img.id = id;
  img.height = height;
  img.width = width;
  return img;
};

const appendImage = (baseCell, id, imgSrcDirectory) => {
  let basePosition = document.getElementById(baseCell.id);
  let classForPieceId = getClassFor(id);
  if (!basePosition.classList.contains('attacking-move')) {
    basePosition.className = '';
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
    cell.className = '';
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

const announceWinner = (gameData) => {
  let gameOverMsg = gameData.winner;
  if (!gameData.winner) {
    gameOverMsg = `GAME DRAW`;
  }
  document.getElementById('leave-battle').style.display = 'none';
  let playAgain = document.querySelector('#play-again');
  playAgain.style.display = 'block';
  let winMsgBox = document.querySelector("#turn-msg");
  winMsgBox.innerText = gameOverMsg;
  let grid = document.querySelector("#battlefield-table");
  grid.removeEventListener('click', getLocation);
};

const getFirstCellId = function(team) {
  let firstRow = document.querySelector(`#${team}`).childNodes[1];
  return firstRow.childNodes[0].id;
};

const incrementId = function(id) {
  let ids = id.split('_');
  let last = ids.length - 1; +
  ids[last]++;
  return ids.join('_');
};

const updateKilledPiece = (cell, piece, team) => {
  let image = document.createElement("img");
  let src = `img/${team}/${piece}.png`;
  let height = "60";
  let width = "60";
  let img = setImageAttributes(image, src, piece, height, width);
  cell.appendChild(img);
};

const showCapturedArmy = function(army, team, cellId) {
  army.forEach(piece => {
    let cell = document.getElementById(cellId);
    updateKilledPiece(cell, piece, team);
    cellId = incrementId(cellId);
  });
};

const showKilledPieces = (killedPieces) => {
  let capturedRedArmy = killedPieces['redArmy'];
  let capturedBlueArmy = killedPieces['blueArmy'];
  let firstRedCell = getFirstCellId('red-army-table');
  let firstBlueCell = getFirstCellId('blue-army-table');
  showCapturedArmy(capturedRedArmy, 'redArmy', firstRedCell);
  showCapturedArmy(capturedBlueArmy, 'blueArmy', firstBlueCell);
};

const initiatePolling = function(imgSrcDirectory) {
  let interval;
  let reqListener = function() {
    let gameData = JSON.parse(this.responseText);
    let status = gameData.status;
    let battlefield = gameData['battlefield'];
    let killedPieces = gameData['killedPieces'];
    let turnBox = document.getElementById('turn-msg');
    turnBox.innerText = `${gameData.turnMsg}`;
    showBattlefield(battlefield, imgSrcDirectory);
    showKilledPieces(killedPieces);
    if (status.gameOver) {
      clearInterval(interval);
      announceWinner(status);
    }
  };
  let callBack = function() {
    doXhr('/battlefield', 'GET', reqListener, '', () => {
      return;
    });
  };
  interval = setInterval(callBack, 1000);
};
