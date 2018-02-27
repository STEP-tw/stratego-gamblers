window.onload = function() {
  drawGrid('battlefield-table', 10, 10, 90, -10);
  drawGrid('troops-lost', 10, 1, 110, 1);
  drawGrid('troops-captured', 10, 1, 130, 1);
  initiatePolling('redArmy','blueArmy');
};
