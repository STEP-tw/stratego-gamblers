const drawBaseGrid = () => {
  drawGrid("baseGrid", 2, 10, 120);
};

const ready = () => {
  notifyPlayer("wait...let opponent setup his army");
  let postData = fetchBattleField();
  let reqListener = () => {
    return;
  };
  const onFail = ()=>{
    notifyPlayer("setup full army");
  };
  doXhr('/setup/player/0', 'POST', reqListener, postData,onFail);
};

window.onload = () => {
  drawGrid("grid", 4, 10, 30);
  drawBaseGrid();
  appendPiecesToBase("redArmy");
  addEventListener(ready, "click", "ready");
};
