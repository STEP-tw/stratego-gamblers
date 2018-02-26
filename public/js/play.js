const doXhr = function (url, method, reqListener, data, onFailed) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function () {
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

const getLocation = (event) => {
  let target = event.target;
  if (target.tagName == 'IMG') {
    target = target.parentNode;
  }
  let postData = `location=${target.id}`;
  const reqListener = function () {
    console.log(this.responseText);
  };
  const onFail = function () {
    console.log(this.responseText);
  };
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
  let image = document.createElement("img");
  let src = `img/${imgSrcDirectory}/${id}.png`;
  let height = "60";
  let width = "60";
  let img = setImageAttributes(image, src, id, height, width);
  if (basePosition.hasChildNodes()) {
    basePosition.childNodes[0].remove();
    // return;
  }
  basePosition.appendChild(img);
};

const updateEmptyCell = (cell) => {
  if (cell.hasChildNodes()) {
    let child = cell.childNodes[0];
    child.remove();
  }
};

const showBattlefield = (battlefield, imgSrcDirectory) => {
  let locations = Object.keys(battlefield);
  locations.forEach(function (location) {
    let cell = document.getElementById(location);
    if (battlefield[location] == "E") {
      return updateEmptyCell(cell);
    }
    appendImage(cell, battlefield[location], imgSrcDirectory);
  });
};

const announceWinner = (gameData) => {
  let gameOverMsg = gameData.winner;
  if(!gameData.winner){
    gameOverMsg = `GAME DRAW`;
  }
  let playAgain = document.querySelector('#play-again');
  playAgain.style.display = 'block';
  let winMsgBox = document.querySelector("#turn-msg");
  winMsgBox.innerText = gameOverMsg;
  let grid = document.querySelector("#battlefield-table");
  grid.removeEventListener('click', getLocation);
};

const getFirstCellId = function (team) {
  let firstRow = document.querySelector(`#${team}`).childNodes[1];
  return firstRow.childNodes[0].id;
};

const incrementId = function (id) {
  let ids = id.split('_');
  let last = ids.length - 1;
  +ids[last]++;
  return ids.join('_');
};

const showCapturedArmy = function (army, team, cellId) {
  army.forEach(piece => {
    let cell = document.getElementById(cellId);
    appendImage(cell, piece, team);
    cellId = incrementId(cellId);
  });
};

const showKilledPieces = (killedPieces) => {
  let capturedRedArmy = killedPieces['redArmy'];
  let capturedBlueArmy = killedPieces['blueArmy'];
  let firstRedCell = getFirstCellId('red-army-table');
  let firstBlueCell = getFirstCellId('blue-army-table');
  showCapturedArmy(capturedRedArmy,'redArmy',firstRedCell);
  showCapturedArmy(capturedBlueArmy,'blueArmy',firstBlueCell);
};

const initiatePolling = function (imgSrcDirectory) {
  let interval;
  let reqListener = function () {
    let gameData = JSON.parse(this.responseText);
    let status = gameData.status;
    let battlefield = gameData['battlefield'];
    let killedPieces = gameData['killedPieces'];
    let turnBox = document.getElementById('turn-msg');
    turnBox.innerText = `${gameData.turnMsg}`;
    showBattlefield(battlefield,imgSrcDirectory);
    showKilledPieces(killedPieces);
    if (status.gameOver) {
      clearInterval(interval);
      announceWinner(status);
    }
  };
  let callBack = function () {
    doXhr('/battlefield', 'GET', reqListener, '', () => {
      return;
    });
  };
  interval = setInterval(callBack, 1000);
};
