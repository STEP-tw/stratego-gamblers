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
}

module.exports = Position;