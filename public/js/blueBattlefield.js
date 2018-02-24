window.onload = function() {
  drawGrid('battlefield-table', 10, 10, 0, 10);
  drawGrid('red-army-table',10,1,110,1);
  drawGrid('blue-army-table',10,1,130,1);
  initiatePolling('blueArmy');
};
