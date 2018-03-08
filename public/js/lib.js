const getElement = (id) => document.getElementById(id);

const setText = (id, text) => {
  getElement(id).innerText = text;
};

const addToClassList = (id,className) =>{
  document.getElementById(id).classList.add(className);
};

const removeFromClassList = (id,className) =>{
  document.getElementById(id).classList.remove(className);
};


const doXhr = function(url, method, reqListener, data) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function() {
    reqListener.call(this);
  };
  if (method == 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  data ? xhr.send(data) : xhr.send();
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

const drawBaseGrid = (row) => {
  drawGrid("base-army-table", row, 10, 120, 10);
};

const ready = (url) => {
  let postData = fetchBattleField();
  if(notDeployedFullArmy(postData)){
    return notifyPlayer("please deploy full army");
  }
  let reqListener = function() {
    if(this.status==200){
      removeDraggable();
      getOpponentStatus();
      removeEventListener(ready, "click", "ready");
      return;
    }
    notifyPlayer("please deploy full army");
  };
  doXhr(url, 'POST', reqListener, postData);
};

const readyForBlue = () =>{
  ready('/setup/player/1');
};

const readyForRed = () =>{
  ready('/setup/player/0');
};

const generateBaseGrid = function(team,responseText){
  let armyDetails = JSON.parse(responseText);
  let army = getPiecesList(armyDetails);
  let rows = army.length/10;
  drawBaseGrid(rows);
  appendPiecesToBase(army,team);
};

const generateRedBaseGrid = function() {
  generateBaseGrid("redArmy",this.responseText);
};

const generateBlueBaseGrid = function() {
  generateBaseGrid("blueArmy", this.responseText);
};

const drawGrid = (containerId, numOfRows, numOfCols, initialID, idGrowth) => {
  let grid = document.getElementById(containerId);
  for (let rows = 0; rows < numOfRows; rows++) {
    let row = generateRow(initialID, numOfCols);
    initialID += idGrowth;
    grid.appendChild(row);
  }
};
