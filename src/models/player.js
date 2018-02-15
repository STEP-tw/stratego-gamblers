class Player {
  constructor(name,id) {
    this.name=name;
    this.id=id;
  }
  getId(){
    return this.id;
  }
  getName(){
    return this.name;
  }
}
module.exports=Player;
