const createBattlefield = ()=>{
  drawGrid('battlefieldGrid',10,10,90);
  assignCellValue();
};

const assignCellValue = ()=>{
  for (let row=0; row<=9; row++) {
    for (let col=0; col<=9; col++) {
      let cell = document.getElementById(`${row}_${col}`);
      cell.innerText = `{${row}_${col}}`;
    }    
  }
};

window.onload = createBattlefield;