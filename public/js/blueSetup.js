const getArmy = () => {
  doXhr('/army','GET',generateBlueBaseGrid,'',()=>console.log('failed'));
};

window.onload = () => {
  drawGrid("grid", 4, 10, 60, 10);
  getArmy();
  addEventListener(readyForBlue, "click", "ready");
};
