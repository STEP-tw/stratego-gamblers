class CompositeHandler {
  constructor () {
    this.handlers = [];
  }
  addHandler(handler){
    this.handlers.push(handler);
    return this;
  }
  execute(req,res,next){
    let index = 0;
    while(!res.finished && index<this.handlers.length){
      this.handlers[index].getRequestHandler()(req,res);
      index++;
    }
    next();
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = CompositeHandler;
