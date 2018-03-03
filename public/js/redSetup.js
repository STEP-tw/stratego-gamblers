const getArmy = () => {
  doXhr('/army','GET',generateRedBaseGrid,'',()=>console.log('failed'));
};

window.onload = () => {
  drawGrid("grid", 4, 10, 30, -10);
  getArmy();
  addEventListener(readyForRed, "click", "ready");
};
