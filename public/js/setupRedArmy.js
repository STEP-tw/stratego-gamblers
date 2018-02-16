const drawBaseGrid = () => {
  drawGrid("baseGrid", 2, 10, 120);
};

const addEventListener = (listner,eventToAdd,elementID)=>{
  let element = document.getElementById(elementID);
  if(element) {
    return element.addEventListener(eventToAdd,listner);
  }
};

const ready = ()=>{
  notifyPlayer("wait...let opponent to setup his army");
  let postData = fetchBattleField();
};
window.onload = () => {
  drawGrid("grid", 4, 10, 30);
  drawBaseGrid();
  appendPiecesToBase("redArmy");
  addEventListener(ready,"click","ready");
};
