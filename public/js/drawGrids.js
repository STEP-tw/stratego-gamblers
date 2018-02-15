const drawGrid=function(containerId,numberOfRows,numberOfCols,initialID) {
  let grid=document.getElementById(containerId);
  for (let rows = 0; rows < numberOfRows; rows++) {
    let row=document.createElement("tr");
    for (let cols = 0; cols < numberOfCols; cols++) {
      let col=document.createElement("td");
      let id = initialID.toString().split("").join("_");
      if(id<10) {
        id=`0_${id}`;
      }
      col.id=id;
      row.appendChild(col);
      initialID++;
    }
    initialID-=20;
    grid.appendChild(row);
  }
};
const getPlayingPiece = ()=>{
  let playingPieces = [
    "flag.png", "spy.png", "scout.png", "scout.png", "miner.png", "miner.png",
    "marshal.png", "general.png",
    "bomb.png", "bomb.png",
  ];
  return playingPieces;
};

const getPlayingPieceId = ()=>{
  let playingPieceId = [
    "F", "S", "2", "2", "3", "3", "10", "9","B","B"
  ];
  return playingPieceId;
};

const appendPiecesToBase = (imgSrcDirectory) => {
  let playingPieces = getPlayingPiece();
  let playingPieceId = getPlayingPieceId();
  let baseGrid = document.getElementById("baseGrid");
  let firstRow = baseGrid.childNodes[1].childNodes;
  firstRow.forEach((element,index) => {
    let basePosition = document.getElementById(element.id);
    let img = document.createElement("img");
    img.src = `../public/img/${imgSrcDirectory}/${playingPieces[index]}`;
    img.id=playingPieceId[index];
    img.height= "60";
    img.width= "60";
    basePosition.appendChild(img);
  });
};