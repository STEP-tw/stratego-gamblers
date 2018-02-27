const doXhr = function(url, method, reqListener, data, onFailed) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function() {
    if (this.status == 200) {
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

const getElement = (id) => document.querySelector(id);

const drag = (event) => {
  event.dataTransfer.setData("imgId", event.target.id);
};

const drop = (event) => {
  event.preventDefault();
  let data = event.dataTransfer.getData("imgId");
  let imgTodrop = document.getElementById(data);
  let target = event.target;
  if (target.tagName == "IMG") {
    let parent = target.parentNode;
    let previousPieceParent = imgTodrop.parentNode;
    parent.replaceChild(imgTodrop,target);
    previousPieceParent.appendChild(target);
    return;
  }
  target.appendChild(imgTodrop);
};

const allowDrop = (event) => {
  event.preventDefault();
};

const applyDragProperty = (img) => {
  img.draggable = true;
  img.addEventListener('dragstart', drag, false);
  return img;
};

const removeDraggable = () => {
  let playingPieceId = getPlayingPieceId();
  playingPieceId.forEach(id => {
    let element = document.getElementById(id);
    element.removeEventListener('dragstart', drag, false);
  });
};

const applyDropProperty = (container) => {
  container.addEventListener('drop', drop, false);
  container.addEventListener('dragover', allowDrop, false);
  return container;
};

const generateCell = (id) => {
  let cell = document.createElement("td");
  if (id < 10) {
    id = `0_${id}`;
  }
  cell.id = id;
  cell = applyDropProperty(cell);
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

const drawGrid = (containerId, numOfRows, numOfCols, initialID, idGrowth) => {
  let grid = document.getElementById(containerId);
  for (let rows = 0; rows < numOfRows; rows++) {
    let row = generateRow(initialID, numOfCols);
    initialID += idGrowth;
    grid.appendChild(row);
  }
};

const getPlayingPiece = () => {
  let playingPieces = [
    "F.png", "S.png", "2.png", "2.png", "3.png", "3.png",
    "10.png", "9.png",
    "B.png", "B.png",
  ];
  return playingPieces;
};

const getPlayingPieceId = () => {
  let playingPieceId = [
    "F", "S", "2", "2a", "3", "3a", "10", "9", "B", "Ba"
  ];
  return playingPieceId;
};

const getNameForRank = (rank) => {
  let pieces = {
    'B': 'bomb',
    'F': 'flag',
    'S': 'spy',
    2: 'scout',
    3: 'miner',
    9: 'general',
    10: 'marshal'
  };
  rank = extractPieceID(rank);
  return pieces[rank];
};

const setImageAttributes = (img, src, id, height, width) => {
  let className = getNameForRank(id);
  img.src = src;
  img.id = id;
  img.height = height;
  img.width = width;
  img.onmouseover = () => {
    document.querySelector(`.${className}`).style.display = "block";
  };
  img.onmouseout = () => {
    document.querySelector(`.${className}`).style.display = "none";
  };
  return img;
};

const appendImage = (baseCell, index, imgSrcDirectory) => {
  let playingPieces = getPlayingPiece();
  let playingPieceId = getPlayingPieceId();
  let basePosition = document.getElementById(baseCell.id);
  let image = document.createElement("img");
  let src = `img/${imgSrcDirectory}/${playingPieces[index]}`;
  let id = playingPieceId[index];
  let height = "77";
  let width = "77";
  let img = setImageAttributes(image, src, id, height, width);
  img = applyDragProperty(img);
  basePosition.appendChild(img);
};

const appendPiecesToBase = (imgSrcDirectory) => {
  let baseGrid = document.getElementById("base-army-table");
  let firstRow = baseGrid.childNodes[1].childNodes;
  firstRow.forEach((element, index) => {
    appendImage(element, index, imgSrcDirectory);
  });
};

const notifyPlayer = (message) => {
  document.getElementById("msg-content-para").innerText = message;
};

const extractPieceID = (id) => {
  return id == '10' ? id : id[0];
};

const fetchCellId = (cell) => {
  if (!cell.hasChildNodes()) {
    return "";
  }
  let piece = cell.childNodes[0];
  let pieceID = extractPieceID(piece.id);
  return `${cell.id}=${pieceID}&`;
};

const fetchBattleField = () => {
  let fetchedDetails = "";
  let battleField = document.getElementById("grid");
  grid.childNodes.forEach(function(row) {
    row.childNodes.forEach(function(cell) {
      fetchedDetails += fetchCellId(cell);
    });
  });
  return fetchedDetails;
};

const notDeployedFullArmy = (pieceAndLocation) => {
  let numberOfPlayingPiece = pieceAndLocation.split('&').length - 1;
  return numberOfPlayingPiece != 10;
};

const addEventListener = (listner, type, elementID) => {
  let element = document.getElementById(elementID);
  if (element) {
    return element.addEventListener(type, listner);
  }
};

const removeEventListener = (listner, type, elementID) => {
  let element = document.getElementById(elementID);
  if (element) {
    return element.removeEventListener(type, listner);
  }
};

const setText = (id, text) => {
  getElement(id).innerText = text;
};

const getOpponentStatus = function() {
  let reqListener = function() {
    window.location.href = this.responseURL;
    clearInterval(interval);
  };
  let onFail = () => {
    notifyPlayer("Waiting for opponent to be ready");
  };
  let callBack = () => {
    doXhr('/isOpponentReady', 'GET', reqListener, '', onFail);
  };
  let interval = setInterval(callBack, 1000);
};
