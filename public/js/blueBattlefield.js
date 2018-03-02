window.onload = function() {
  drawGrid('battlefield-table', 10, 10, 0, 10);
  drawGrid('troops-lost', 6, 2, 110, 1);
  drawGrid('troops-captured', 6, 2, 130, 2);
  initiatePolling('blueArmy','redArmy');
};
