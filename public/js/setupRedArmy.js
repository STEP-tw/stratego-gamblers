const drawBaseGrid=()=>{
  drawGrid("baseGrid",2,10,120);
};

const appendPiecesToBase=()=>{
  let baseGrid = document.getElementById("baseGrid");
  let firstRow=baseGrid.childNodes[1].childNodes;
  firstRow.forEach(element => {
    let basePosition = document.getElementById(element.id);
    let img = document.createElement("img");
    img.src="../public/img/redArmy/spy.png";
    img.setAttribute("height","60");
    img.setAttribute("width", "60");
    basePosition.appendChild(img);
  });
};
window.onload =()=>{
  drawGrid("grid",4,10,30);
  drawBaseGrid();
  appendPiecesToBase();
};
