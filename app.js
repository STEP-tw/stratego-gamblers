const express = require('express');
const cookieParser =require('cookie-parser');
const Game=require('./src/models/game.js');
const app = express();
const log = require("./src/handlers/logger.js").log;

let game = new Game();

const setBattlefield = function(req,res,next){
  let playerId = req.params.playerId;
  let placedPositions = req.body;
  game.setBattlefieldFor(playerId,placedPositions);
  game.updateStatus();
  next();
};

const checkForReady = function(req,res,next){
  if(game.readyStatus){
    res.send('show battle field');
    return;
  }
  res.send('wait for opponent');
};

app.use(log());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static('public'));
app.post('/setup/player/:playerId',setBattlefield);
app.use('/setup/player/',checkForReady);
module.exports=app;
