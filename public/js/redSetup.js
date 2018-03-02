const drawBaseGrid = (row) => {
  drawGrid("base-army-table", row, 10, 120, 10);
};

const ready = () => {
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
  doXhr('/setup/player/0', 'POST', reqListener, postData, onFail);
};

const isQuickMode = function (army) {
  return army.length==10;
};

const generateBaseGrid = function(){
  let armyDetails = JSON.parse(this.responseText);
  let army = getPiecesList(armyDetails);
  let rows = army.length/10;
  drawBaseGrid(rows);
  appendPiecesToBase(army,"redArmy");
};

const getArmy = () => {
  doXhr('/army','GET',generateBaseGrid,'',()=>console.log('failed'));
};

window.onload = () => {
  drawGrid("grid", 4, 10, 30, -10);
  getArmy();
  addEventListener(ready, "click", "ready");
};
