const getNeighbour = require('../lib/lib.js').getNeighbour;
const getPath = require('../lib/lib.js').getPath;

class Position {
  constructor(pos){
    this.xPos = pos.split('_')[0];
    this.yPos = pos.split('_')[1];
    this.neighbour = [];
  }
  getRightPos(){
    return getNeighbour(+this.xPos,+this.yPos,9,1);
  }
  getLeftPos(){
    return getNeighbour(+this.xPos,+this.yPos,0,-1);
  }
  getFacePos(){
    let frontPos = [];
    let pos = getNeighbour(+this.yPos,+this.xPos,9,1)[0];
    if(pos) {
      frontPos.push(`${pos[2]}_${pos[0]}`);
    }
    return frontPos;
  }
  getBackPos(){
    let backPos = [];
    let pos = getNeighbour(+this.yPos,+this.xPos,0,-1)[0];
    if(pos) {
      backPos.push(`${pos[2]}_${pos[0]}`);
    }
    return backPos;
  }
  getNeighbourPos(){
    let rightPos = this.getRightPos();
    let leftPos = this.getLeftPos();
    let facePos = this.getFacePos();
    let backPos = this.getBackPos();
    return [...rightPos,...leftPos,...facePos,...backPos];
  }

  getHorizontalPath(destination,factor){
    return getPath(+this.xPos,+this.yPos,destination,factor);
  }
  getVerticalPath(destination,factor){
    let path = getPath(+this.yPos,+this.xPos,destination,factor);
    return path.map(loc=>{
      return `${loc[2]}_${loc[0]}`;
    }) || [];
  }
  getAllPosRight(){
    return this.getHorizontalPath(9,1);
  }
  getAllPosLeft(){
    return this.getHorizontalPath(0,-1);
  }
  getAllPosBack(){
    return this.getVerticalPath(0,-1);
  }
  getAllPosAhead(){
    return this.getVerticalPath(9,1);
  }
}

module.exports = Position;
