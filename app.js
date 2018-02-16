const express = require('express');
const cookieParser =require('cookie-parser');
const Game=require('./src/models/game.js');
const app = express();
const log = require("./src/handlers/logger.js").log;
const AddPlayerHandler = require('./src/handlers/addPlayerHandler.js');

let game = new Game();

const setBattlefield = function(req,res){
  let playerId = req.params.playerId;
  let placedPositions = req.body;
  console.log(playerId,placedPositions);
  game.setBattlefieldFor(playerId,placedPositions);
  console.log(game.battlefield.placedPositions);
  res.end();
};

app.game = new Game("ravi");
app.use(log());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static('public'));
app.post("/gameId",new AddPlayerHandler().getRequestHandler());
app.post('/setup/:playerId',setBattlefield);
module.exports=app;
