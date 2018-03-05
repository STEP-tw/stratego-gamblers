window.onload = function() {
  drawBattlefield('battlefield-table', 10, 10, 0, 10);
  drawGrid('troops-lost', 6, 2, 110, 2);
  drawGrid('troops-captured', 6, 2, 130, 2);
  setBattlefield('blueArmy','redArmy');
};
