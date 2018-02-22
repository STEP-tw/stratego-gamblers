class Position {
  constructor(pos){
    this.xPos = pos.split('_')[0];
    this.yPos = pos.split('_')[1];
    this.neighbour = [];
  }
  getRightPos(){
    if(this.xPos!=9){
      return `${+this.xPos+1}_${this.yPos}`;
    }
  }
  getLeftPos(){
    if(this.xPos!=0){
      return `${+this.xPos-1}_${this.yPos}`;
    }
  }
  getFacePos(){
    if(this.yPos!=9){
      return `${this.xPos}_${+this.yPos+1}`;
    }
  }
  getBackPos(){
    if(this.yPos!=0){
      return `${this.xPos}_${+this.yPos-1}`;
    }
  }
  getNeighbourPos(){
    let rightPos = this.getRightPos();
    let leftPos = this.getLeftPos();
    let facePos = this.getFacePos();
    let backPos = this.getBackPos();
    if(rightPos){
      this.neighbour.push(rightPos);
    }
    if(leftPos){
      this.neighbour.push(leftPos);
    }
    if(facePos){
      this.neighbour.push(facePos);
    }
    if(backPos){
      this.neighbour.push(backPos);
    }
    return this.neighbour;
  }
  getAllPosRight(){
    let xPos = this.xPos;
    let allPosRight = [];
    while(+xPos < 9){
      allPosRight.push(`${+xPos+1}_${this.yPos}`);
      xPos++;
    }
    return allPosRight;
  }
  getAllPosLeft(){
    let xPos = this.xPos;
    let allPosLeft = [];
    while(+xPos > 0){
      allPosLeft.push(`${+xPos-1}_${this.yPos}`);
      xPos--;
    }
    return allPosLeft;
  }
  getAllPosBack(){
    let yPos = this.yPos;
    let allPosBack = [];
    while(+yPos > 0){
      allPosBack.push(`${this.xPos}_${+yPos-1}`);
      yPos--;
    }
    return allPosBack;
  }
  getAllPosAhead(){
    let yPos = this.yPos;
    let allPosAhead = [];
    while(+yPos < 9){
      allPosAhead.push(`${this.xPos}_${+yPos+1}`);
      yPos++;
    }
    return allPosAhead;
  }
}

module.exports = Position;
