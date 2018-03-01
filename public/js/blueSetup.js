const drawBaseGrid = (row) => {
  drawGrid("base-army-table", row, 10, 120, 10);
};

const ready = () => {
  let postData = fetchBattleField();
  let reqListener = () => {
    removeDraggable();
    getOpponentStatus();
  };
  const onFail = () => {
    return;
  };
  if (notDeployedFullArmy(postData)) {
    return notifyPlayer("setup full army");
  }
  doXhr('/setup/player/1', 'POST', reqListener, postData, onFail);
  removeEventListener(ready, "click", "ready");
};

const generateBaseGrid = function(){
  let armyDetails = JSON.parse(this.responseText);
  let army = getPiecesList(armyDetails);
  let rows = army.length/10;
  drawBaseGrid(rows);
  appendPiecesToBase(army,"blueArmy");
};

const getArmy = () => {
  doXhr('/army','GET',generateBaseGrid,'',()=>console.log('failed'));
};

window.onload = () => {
  drawGrid("grid", 4, 10, 60, 10);
  getArmy();
  addEventListener(ready, "click", "ready");
};
