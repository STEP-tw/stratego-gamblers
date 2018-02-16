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
  doXhr('/setup/player/0', 'POST', reqListener, postData,onFail);
  notifyPlayer("wait...let opponent setup his army");
  removeEventListener(ready, "click", "ready");
};

window.onload = () => {
  drawGrid("grid", 4, 10, 30);
  drawBaseGrid();
  appendPiecesToBase("redArmy");
  addEventListener(ready, "click", "ready");
};
