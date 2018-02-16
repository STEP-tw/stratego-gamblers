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
  if(hasPlacedAllPieces(postData)){
    return notifyPlayer("setup full army");
  }
  doXhr('/setup/player/1', 'POST', reqListener, postData,onFail);
};

window.onload = () => {
  drawGrid("grid", 4, 10, 90);
  drawBaseGrid();
  appendPiecesToBase("blueArmy");
  addEventListener(ready, "click", "ready");
};
