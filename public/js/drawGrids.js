const drawGrids=function(numberOfRows,numberOfCols,initialID) {
  let grid=document.getElementById("grid");
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
