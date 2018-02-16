class AddPlayerHandler {
  constructor() {
  }
  execute(req, res) {
    let userName = req.body.name;
    let game = req.app.game;
    game.addPlayer(userName);
    let id = userName;
    res.send(id);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = AddPlayerHandler;
