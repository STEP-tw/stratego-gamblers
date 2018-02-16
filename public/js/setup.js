const drag = (event) => {
  event.dataTransfer.setData("imgId", event.target.id);
};

const drop = (event) => {
  event.preventDefault();
  let data = event.dataTransfer.getData("imgId");
  event.target.appendChild(document.getElementById(data));
};

const allowDrop = (event) => {
  event.preventDefault();
};

const applyDragProperty = (img) => {
  img.draggable = true;
  img.addEventListener('dragstart', drag, false);
  return img;
};

const applyDropProperty = (container) => {
  container.addEventListener('drop', drop, false);
  container.addEventListener('dragover', allowDrop, false);
  return container;
};

const generateCell = (id) => {
  let cell = document.createElement("td");
  if (id < 10) {
    id = `0_${id}`;
  }
  cell.id = id;
  cell = applyDropProperty(cell);
  return cell;
};

const generateRow = (initialID, numberOfCols) => {
  let row = document.createElement("tr");
  for (let cols = 0; cols < numberOfCols; cols++) {
    let id = initialID.toString().split("").join("_");
    let cell = generateCell(id);
    row.appendChild(cell);
    initialID++;
  }
  return row;
};

const drawGrid = function(containerId, numberOfRows, numberOfCols, initialID) {
  let grid = document.getElementById(containerId);
  for (let rows = 0; rows < numberOfRows; rows++) {
    let row = generateRow(initialID, numberOfCols);
    initialID -= 10;
    grid.appendChild(row);
  }
};

const getPlayingPiece = () => {
  let playingPieces = [
    "flag.png", "spy.png", "scout.png", "scout.png", "miner.png", "miner.png",
    "marshal.png", "general.png",
    "bomb.png", "bomb.png",
  ];
  return playingPieces;
};

const getPlayingPieceId = () => {
  let playingPieceId = [
    "F", "S", "2", "2a", "3", "3a", "10", "9", "B", "Ba"
  ];
  return playingPieceId;
};

const setImageAttributes = (img, src, id, height, width) => {
  img.src = src;
  img.id = id;
  img.height = height;
  img.width = width;
  return img;
};

const appendImage = (baseCell, index, imgSrcDirectory) => {
  let playingPieces = getPlayingPiece();
  let playingPieceId = getPlayingPieceId();
  let basePosition = document.getElementById(baseCell.id);
  let image = document.createElement("img");
  let src = `img/${imgSrcDirectory}/${playingPieces[index]}`;
  let id = playingPieceId[index];
  let height = "60";
  let width = "60";
  let img = setImageAttributes(image, src, id, height, width);
  img = applyDragProperty(img);
  basePosition.appendChild(img);
};

const appendPiecesToBase = (imgSrcDirectory) => {
  let baseGrid = document.getElementById("baseGrid");
  let firstRow = baseGrid.childNodes[1].childNodes;
  firstRow.forEach((element, index) => {
    appendImage(element, index, imgSrcDirectory);
  });
};

const notifyPlayer=(message)=>{
  document.getElementById("readyStatus").innerText=message;
};

const extractPieceID=(id)=>{
  if(id=='10'){
    return id;
  }
  return id[0];
};

const fetchBattleField=()=>{
  let fetchedDetails="";
  let battleField = document.getElementById("grid");
  grid.childNodes.forEach(function(row){
    row.childNodes.forEach(function(cell){
      if(!cell.hasChildNodes()) {
        return;
      }
      let pieceID = extractPieceID(cell.childNodes[0].id);
      fetchedDetails+=`${cell.id}=${pieceID}&`;
    });
  });
  console.log(fetchedDetails);
  return fetchedDetails;
};
