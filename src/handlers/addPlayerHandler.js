const CompositeHandler = require('./CompositeHandler.js');
class AddPlayerHandler extends CompositeHandler {
  constructor(action) {
    super();
  }
  execute(req, res) {
    let userName = req.body.name;
    let game = req.app.game;
    game.addPlayer(userName);
    let id = userName;
    res.send(id);
  }
}

module.exports = AddPlayerHandler;
