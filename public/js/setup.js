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
  img.onmouseover = () => {
    document.querySelector(`.${className}`).style.display = "block";
  };
  img.onmouseout = () => {
    document.querySelector(`.${className}`).style.display = "none";
  };
  return img;
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
  let baseCells = getFreeLocFrom('base-army-table');
  baseCells.forEach((element, index) => {
    appendImage(element, army[index], imgSrcDirectory);
  });
};

const fetchArmyFrom = function(id) {
  let army = [];
  let baseArmy = [...getElement(id).childNodes];
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

const getFreeLocFrom = (id) => {
  let grid = [...getElement(id).childNodes];
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

const disableButton = (id)=>{
  let button = getElement(id);
  button.disabled = true;
  button.style.backgroundColor = "rgb(88, 76, 45)";
  button.style.color = "rgb(34, 32, 24)";
  button.style["pointer-events"]="none";
};

const enableButton = (id) => {
  let button = getElement(id);
  button.disabled = false;
  button.style.backgroundColor = "rgb(156, 131, 69)";
  button.style.color = "black";
  button.style["pointer-events"]="initial";
};

const appendPiecesToHome = (imgSrcDirectory) => {
  let army = fetchArmyFrom('base-army-table');
  let freeLand = getFreeLocFrom('grid');
  let randomNumber, position;
  army.forEach((piece) => {
    randomNumber = Math.floor(Math.random() * (freeLand.length - 1));
    position = freeLand[randomNumber];
    appendImage(position, piece, imgSrcDirectory);
    freeLand.splice(randomNumber, 1);
  });
  disableButton('random-setup');
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

const showPopup = (id) => {
  document.querySelector(`.${id}`).style.display = 'block';
};

const hidePopup = (id) => {
  document.querySelector(`.${id}`).style.display = 'none';
};

const respondToSaveSetup = function(){
  if(this.status==200){
    disableButton('save-setup');
    return notifyPlayer('Your setup has been saved');
  }
};

const isSetupNameExist = function(allSetups,setupName) {
  return allSetups.find((setup)=>{
    return setup.name==setupName;
  });
};

const isNewSetup = function(setupName) {
  let saveNewSetup = function() {
    if(this.status==200){
      let allSetups = JSON.parse(this.responseText);
      if(!isSetupNameExist(allSetups,setupName)){
        let homeLand = fetchHomeLand();
        let postData = homeLand + `setupName=${setupName}`;
        doXhr('/saveSetup', 'POST', respondToSaveSetup, postData);
        hidePopup('save-setup-popup');
        return;
      }
      getElement('error-msg').innerText = "Setup name already exist";
      getElement('error-msg').style.visibility = 'visible';
    }
  };
  doXhr('/setupNames','GET',saveNewSetup,'');
};

const saveSetup = () => {
  let setupName = document.getElementById('setup-name').value;
  setupName = setupName.trim();
  if(setupName.match(/(^[a-z])\w*$/gi) && setupName){
    isNewSetup(setupName);
  }else{
    getElement('error-msg').style.visibility = 'visible';
  }
};

const showSaveSetupPopup = () => {
  let homeLand = fetchHomeLand();
  if (notDeployedFullArmy(homeLand)) {
    notifyPlayer('Deploy your full army');
  } else {
    getElement('error-msg').style.visibility = 'hidden';
    showPopup('save-setup-popup');
  }
};

const hideSaveSetupPopup = () => {
  hidePopup('save-setup-popup');
};

const removeAllChild = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

const showSetups = function(){
  if(this.status==200){
    let dropdown = document.querySelector('.dropdown-button');
    removeAllChild(dropdown);
    let allSetups = JSON.parse(this.responseText);
    allSetups.forEach((setup)=>{
      let option = document.createElement('option');
      option.id = setup.index;
      option.innerText = setup.name;
      dropdown.appendChild(option);
    });
  }
};

const showLoadSetupPopup = () => {
  showPopup('load-setup-popup');
  doXhr('/setupNames','GET',showSetups,'');
};

const hideLoadSetupPopup = () => {
  hidePopup('load-setup-popup');
};

const loadToHomeLand = (setup,imgSrcDirectory) => {
  let grid = [...getElement('grid').childNodes];
  grid.shift();
  let locations = Object.keys(setup);
  let index=1,loc=0;
  grid.forEach((rows)=>{
    rows.childNodes.forEach((td)=>{
      if(index==locations[loc]){
        appendImage(td.id,setup[index], imgSrcDirectory);
        loc++;
      }
      index++;
    });
  });
};

const loadSelectedSetup = (imgSrcDirectory) =>{
  let dropdown = document.querySelector('.dropdown-button');
  let loadSetup = function(){
    if(this.status==200 && this.responseText){
      fetchArmyFrom('grid');
      let setup = JSON.parse(this.responseText);
      fetchArmyFrom('base-army-table');
      loadToHomeLand(setup,imgSrcDirectory);
      disableButton('random-setup');
    }
  };
  let id = dropdown.options[dropdown.selectedIndex].id;
  doXhr('/loadSetup','POST',loadSetup,`id=${id}`);
  hideLoadSetupPopup();
};

const removeAllPieces = (imgSrcDirectory) =>{
  let army = fetchArmyFrom('grid');
  appendPiecesToBase(army,imgSrcDirectory);
  enableButton('random-setup');
  enableButton('save-setup');
};
