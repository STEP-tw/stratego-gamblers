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

const setImageAttributes = (img,src,id,height,width)=>{
  img.src = src;
  img.id=id;
  img.height= height;
  img.width= width;
  return img;
};

const appendImage=(baseCell,index,imgSrcDirectory)=>{
  let playingPieces = getPlayingPiece();
  let playingPieceId = getPlayingPieceId();
  let basePosition = document.getElementById(baseCell.id);
  let image = document.createElement("img");
  let src = `../public/img/${imgSrcDirectory}/${playingPieces[index]}`;
  let id=playingPieceId[index];
  let height= "60";
  let width= "60";
  let img = setImageAttributes(image,src,id,height,width);
  basePosition.appendChild(img);
};

const appendPiecesToBase = (imgSrcDirectory) => {
  let baseGrid = document.getElementById("baseGrid");
  let firstRow = baseGrid.childNodes[1].childNodes;
  firstRow.forEach((element,index) => {
    appendImage(element,index,imgSrcDirectory);
  });
};
