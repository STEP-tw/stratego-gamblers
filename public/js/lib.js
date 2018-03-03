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
    return notifyPlayer("setup full army");
  }
  let reqListener = () => {
    removeDraggable();
    getOpponentStatus();
    removeEventListener(ready, "click", "ready");
  };
  const onFail = () => {
  };
  doXhr(url, 'POST', reqListener, postData, onFail);
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
