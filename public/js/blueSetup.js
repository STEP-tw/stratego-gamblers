const drawBaseGrid = () => {
  drawGrid("base-army-table", 2, 10, 120, 10);
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

window.onload = () => {
  drawGrid("grid", 4, 10, 60, 10);
  drawBaseGrid();
  appendPiecesToBase("blueArmy");
  addEventListener(ready, "click", "ready");
};
