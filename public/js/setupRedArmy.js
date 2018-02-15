const drawBaseGrid = () => {
  drawGrid("baseGrid", 2, 10, 120);
};

window.onload = () => {
  drawGrid("grid", 4, 10, 30);
  drawBaseGrid();
  appendPiecesToBase("redArmy");
};
