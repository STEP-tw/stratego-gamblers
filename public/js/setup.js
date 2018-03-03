const getElement = (id) => document.querySelector(id);

const drag = (event) => {
  event.dataTransfer.setData("parent", event.target.parentNode.id);
};

const drop = (event) => {
  event.preventDefault();
  let parentId = event.dataTransfer.getData("parent");
  let parent = document.getElementById(parentId);
  let imgTodrop = parent.childNodes[0];
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
  let battleField = document.getElementById("grid");
  grid.childNodes.forEach(function(row) {
    row.childNodes.forEach(function(cell) {
      if(cell.hasChildNodes()){
        cell.childNodes[0].removeEventListener('dragstart', drag, false);
      }
    });
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

const drawGrid = (containerId, numOfRows, numOfCols, initialID, idGrowth) => {
  let grid = document.getElementById(containerId);
  for (let rows = 0; rows < numOfRows; rows++) {
    let row = generateRow(initialID, numOfCols);
    initialID += idGrowth;
    grid.appendChild(row);
  }
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
  return pieces[rank];
};

const setImageAttributes = (img, src, id, height, width) => {
  let className = getNameForRank(id);
  img.src = src;
  img.id = id;
  img.height = height;
  img.width = width;
  // img.onmouseover = () => {
  //   document.querySelector(`.${className}`).style.display = "block";
  // };
  // img.onmouseout = () => {
  //   document.querySelector(`.${className}`).style.display = "none";
  // };
  return img;
};

const incrementId = function(id) {
  let next = +(id.split('_').join(''))+1;
  next = next<10 ? `0${next}` : next.toString();
  return next.split('').join('_');
};

const getBaseGridIds = function(initialId,armyLength) {
  let ids = [initialId];
  for (let index = 1; index < armyLength; index++) {
    initialId = incrementId(initialId);
    ids.push(initialId);
  }
  return ids;
};

const appendImage = (baseCell, id, imgSrcDirectory) => {
  let basePosition = document.getElementById(baseCell);
  let image = document.createElement("img");
  let src = `img/${imgSrcDirectory}/${id}.png`;
  let height = "77";
  let width = "77";
  let img = setImageAttributes(image, src, id, height, width);
  img = applyDragProperty(img);
  basePosition.appendChild(img);
};

const appendPiecesToBase = (army,imgSrcDirectory) => {
  let baseGrid = document.getElementById("base-army-table");
  let initialId = baseGrid.childNodes[1].childNodes[0].id;
  let baseCells = getBaseGridIds(initialId,army.length);
  baseCells.forEach((element, index) => {
    appendImage(element, army[index], imgSrcDirectory);
  });
};

const getInitChildId = (army)=>{
  let ids = {
    redArmy: document.getElementById('grid').lastChild.firstChild.id,
    blueArmy: document.getElementById('grid').childNodes[1].firstChild.id
  };
  return ids[army];
};

const removePiecesFromBase = (army) =>{
  let armyBaseIds = getBaseGridIds('1_2_0',army.length);
  armyBaseIds.forEach(id=>{
    document.getElementById(id).firstChild.remove();
  });
};

const fetchArmyFromBase = function(){
  let army = [];
  let baseArmy = [...document.getElementById('base-army-table').childNodes];
  baseArmy.shift();
  baseArmy.forEach(row=>{
    row.childNodes.forEach(td=>{
      army.push(td.firstChild.id);
    });
  });
  return army;
};

const appendPiecesToHome = (imgSrcDirectory) => {
  let initialId = getInitChildId(imgSrcDirectory);
  let army = fetchArmyFromBase();
  let baseCells = getBaseGridIds(initialId,40);
  let randomNumber,position;
  army.forEach((piece, index) => {
    randomNumber = Math.floor(Math.random()*(40-index));
    position=baseCells[randomNumber];
    appendImage(position, piece, imgSrcDirectory);
    baseCells.splice(randomNumber,1);
  });
  removePiecesFromBase(army);
  document.getElementById('random').style.display = 'none';
};

const notifyPlayer = (message) => {
  document.getElementById("msg-content-para").innerText = message;
};

const fetchCellId = (cell) => {
  if (!cell.hasChildNodes()) {
    return "";
  }
  let piece = cell.childNodes[0];
  let pieceID = piece.id;
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

const getPiecesList = function(piecesWithQty){
  let army = [];
  for (let rank in piecesWithQty) {
    let quantity = piecesWithQty[rank];
    army = army.concat(new Array(quantity).fill(rank));
  }
  return army;
};

const notDeployedFullArmy = (pieceAndLocation) => {
  let base = document.getElementById('base-army-table');
  let armyStrength = (base.childNodes.length-1)*10;
  let numberOfPlayingPiece = pieceAndLocation.split('&').length - 1;
  return numberOfPlayingPiece != armyStrength;
};
