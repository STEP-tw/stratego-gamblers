const dbManager=require('./dbManager.js');

exports.getFrequency = list=>{
  let frequencies = {};
  for(let index=0;index<list.length;index++){
    let element = list[index];
    if(!frequencies[element]){
      frequencies[element]= 0;
    }
    frequencies[element]++;
  }
  return frequencies;
};

exports.isEquivalent = (obj1, obj2)=>{
  let obj1Props = Object.getOwnPropertyNames(obj1);
  let obj2Props = Object.getOwnPropertyNames(obj2);
  if (obj1Props.length != obj2Props.length) {
    return false;
  }
  for (let index = 0;index < obj1Props.length;index++) {
    let propName = obj1Props[index];
    if (obj1[propName] !== obj2[propName]){
      return false;
    }
  }
  return true;
};

exports.getSymbolForPos = (positionsWithId,positionsArray,symbol)=>{
  positionsArray.forEach(position=>{
    positionsWithId[position] = symbol;
  });
  return positionsWithId;
};

exports.getStatusMsg = (playerId, status) => {
  let statusMsg = {
    true: 'win',
    false: 'lose',
    quit: 'surrender'
  };
  if (status.winner) {
    status.winner = statusMsg[playerId == status.winner];
  }
  if (status.gameOver=='quit') {
    status.winner = statusMsg["quit"];
  }
  return status;
};

exports.getNeighbour = (initial,stable,final,factor)=>{
  let neighbour = [];
  if(initial!=final){
    neighbour.push(`${initial+factor}_${stable}`);
  }
  return neighbour;
};

exports.getPath = (init,stat,final,factor)=>{
  let allPos=[];
  while(init!=final){
    init+=factor;
    allPos.push(`${init}_${stat}`);
  }
  return allPos;
};
