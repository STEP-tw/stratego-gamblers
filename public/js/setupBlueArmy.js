const drawBaseGrid = () => {
  drawGrid("baseGrid", 2, 10, 120);
};

const ready = () => {
  let postData = fetchBattleField();
  let reqListener = () => {
    return;
  };
  const onFail = ()=>{
    return;
  };
  if(notDeployedFullArmy(postData)){
    return notifyPlayer("setup full army");
  }
  doXhr('/setup/player/1', 'POST', reqListener, postData,onFail);
  notifyPlayer("wait...let opponent setup his army");
  removeEventListener(ready, "click", "ready");
};

window.onload = () => {
  drawGrid("grid", 4, 10, 90);
  drawBaseGrid();
  appendPiecesToBase("blueArmy");
  addEventListener(ready, "click", "ready");
};
