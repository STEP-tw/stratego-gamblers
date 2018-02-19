class Player {
  constructor(name,id,color) {
    this.name=name;
    this.id=id;
    this.color=color;
  }
  getId(){
    return this.id;
  }
  getColor(){
    return this.color;
  }
  getName(){
    return this.name;
  }
}
module.exports=Player;
