const drag = (event) => {
  event.dataTransfer.setData("parent", event.target.parentNode.id);
};

const drop = (event) => {
  event.preventDefault();
  let parentId = event.dataTransfer.getData("parent");
  let parent = getElement(parentId);
  let imgTodrop = parent.childNodes[0];
  let target = event.target;
  if (target.tagName == "IMG") {
    let parent = target.parentNode;
    let previousPieceParent = imgTodrop.parentNode;
    parent.replaceChild(imgTodrop, target);
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
  let battleField = getElement("grid");
  grid.childNodes.forEach(function(row) {
    row.childNodes.forEach(function(cell) {
      cell.removeEventListener('drop', drop, false);
      if (cell.hasChildNodes()) {
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

const getNameForRank = (rank) => {
  let pieces = {
    'B': 'bomb',
    'F': 'flag',
    'S': 'spy',
    2: 'scout',
    3: 'miner',
    4: 'sergeant',
    5: 'lieutenant',
    6: 'captain',
    7: 'major',
    8: 'colonel',
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
  return img;
};

const incrementId = function(id) {
  let next = +(id.split('_').join('')) + 1;
  next = next < 10 ? `0${next}` : next.toString();
  return next.split('').join('_');
};

const getBaseGridIds = function(initialId, armyLength) {
  let ids = [initialId];
  for (let index = 1; index < armyLength; index++) {
    initialId = incrementId(initialId);
    ids.push(initialId);
  }
  return ids;
};

const appendImage = (baseCell, id, imgSrcDirectory) => {
  let basePosition = getElement(baseCell);
  let image = document.createElement("img");
  let src = `img/${imgSrcDirectory}/${id}.png`;
  let height = "77";
  let width = "77";
  let img = setImageAttributes(image, src, id, height, width);
  img = applyDragProperty(img);
  basePosition.appendChild(img);
};

const appendPiecesToBase = (army, imgSrcDirectory) => {
  let baseGrid = getElement("base-army-table");
  let initialId = baseGrid.childNodes[1].childNodes[0].id;
  let baseCells = getBaseGridIds(initialId, army.length);
  baseCells.forEach((element, index) => {
    appendImage(element, army[index], imgSrcDirectory);
  });
};

const getInitChildId = (army) => {
  let ids = {
    redArmy: getElement('grid').lastChild.firstChild.id,
    blueArmy: getElement('grid').childNodes[1].firstChild.id
  };
  return ids[army];
};

const fetchArmyFromBase = function() {
  let army = [];
  let baseArmy = [...getElement('base-army-table').childNodes];
  baseArmy.shift();
  baseArmy.forEach(row => {
    row.childNodes.forEach(td => {
      if (td.hasChildNodes()) {
        army.push(td.firstChild.id);
        td.firstChild.remove();
      }
    });
  });
  return army;
};

const getFreeHomeLand = () => {
  let grid = [...getElement('grid').childNodes];
  let homeLand = [];
  grid.shift();
  grid.forEach(row => {
    row.childNodes.forEach(td => {
      if (!td.hasChildNodes()) {
        homeLand.push(td.id);
      }
    });
  });
  return homeLand;
};

const appendPiecesToHome = (imgSrcDirectory) => {
  let army = fetchArmyFromBase();
  let freeLand = getFreeHomeLand();
  let randomNumber, position;
  army.forEach((piece) => {
    randomNumber = Math.floor(Math.random() * (freeLand.length - 1));
    position = freeLand[randomNumber];
    appendImage(position, piece, imgSrcDirectory);
    freeLand.splice(randomNumber, 1);
  });
  getElement('random').style.display = 'none';
};

const notifyPlayer = (message) => {
  getElement("msg-content-para").innerText = message;
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
  let battleField = getElement("grid");
  battleField.childNodes.forEach(function(row) {
    row.childNodes.forEach(function(cell) {
      fetchedDetails += fetchCellId(cell);
    });
  });
  return fetchedDetails;
};

const addEventListener = (listner, type, elementID) => {
  let element = getElement(elementID);
  if (element) {
    return element.addEventListener(type, listner);
  }
};

const removeEventListener = (listner, type, elementID) => {
  let element = getElement(elementID);
  if (element) {
    return element.removeEventListener(type, listner);
  }
};

const getOpponentStatus = function() {
  let reqListener = function() {
    if (this.status == 202) {
      notifyPlayer("Waiting for opponent to be ready");
      return;
    }
    window.location.href = this.responseURL;
    clearInterval(interval);
  };
  let callBack = () => {
    doXhr('/isOpponentReady', 'GET', reqListener, null);
  };
  let interval = setInterval(callBack, 1000);
};

const getPiecesList = function(piecesWithQty) {
  let army = [];
  for (let rank in piecesWithQty) {
    let quantity = piecesWithQty[rank];
    army = army.concat(new Array(quantity).fill(rank));
  }
  return army;
};

const notDeployedFullArmy = (pieceAndLocation) => {
  let base = getElement('base-army-table');
  let armyStrength = (base.childNodes.length - 1) * 10;
  let numberOfPlayingPiece = pieceAndLocation.split('&').length - 1;
  return numberOfPlayingPiece != armyStrength;
};

const generatePieceLocPair = (cell, index) => {
  if (!cell.hasChildNodes()) {
    return "";
  }
  let piece = cell.firstChild;
  let pieceID = piece.id;
  return `${index}=${pieceID}&`;
};

const fetchHomeLand = () => {
  let fetchedDetails = "";
  let homeLand = getElement("grid");
  let index = 1;
  homeLand.childNodes.forEach(function(row) {
    row.childNodes.forEach(function(cell) {
      fetchedDetails += generatePieceLocPair(cell, index);
      index++;
    });
  });
  return fetchedDetails;
};

const saveSetup = () => {
  let homeLand = fetchHomeLand();
  if (notDeployedFullArmy(homeLand)) {
    notifyPlayer('please deploy full army');
  } else {
    doXhr('/saveSetup', 'POST', null, homeLand);
    document.querySelector('#save-setup').style.display = 'none';
  }
};
