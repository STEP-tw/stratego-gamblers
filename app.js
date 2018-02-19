const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const Game = require('./src/models/game.js');
const app = express();
const log = require("./src/handlers/logger.js").log;
const validator = require('./src/lib/validate.js');
const Sessions = require('./src/models/sessions.js');
const CreateGameHandler = require('./src/handlers/createGameHandler.js');
const JoinGameHandler = require('./src/handlers/joinGameHandler.js');

app.fs = fs;
app.sessions = new Sessions();


const setBattlefield = function (req, res) {
  let game = req.app.game;
  let playerId = req.params.playerId;
  let placedPos = req.body;
  if(validator.isValidData(playerId,placedPos)){
    game.setBattlefieldFor(playerId, placedPos);
    res.end();
    return;
  }
  res.status(206).send('pieces or location missing!');
};

const haveBothPlayersJoined = function (req, res) {
  let game = req.app.game;
  res.send(game.haveBothPlayersJoined());
};

const setupRedArmy = function (req, res) {
  let setupTemp = req.app.fs.readFileSync('./templates/setupArmy', 'utf8');
  setupTemp = setupTemp.replace('{{team}}', 'Red');
  let game = req.app.game;
  let name = game.getPlayerName("red");
  setupTemp = setupTemp.replace('{{playerName}}', name);
  res.send(setupTemp);
};

const setupBlueArmy = function (req, res) {
  let setupTemp = app.fs.readFileSync('./templates/setupArmy', 'utf8');
  setupTemp = setupTemp.replace('{{team}}', 'Blue');
  let game = req.app.game;
  let name = game.getPlayerName("blue");
  setupTemp = setupTemp.replace('{{playerName}}', name);
  res.send(setupTemp);
};

const getPieceFromLocation = function (req, res) {
  let pieceLoc = req.params.pieceLoc;
  let playerId = req.params.playerId;
  let game = req.app.game;
  let battlePosition=game.battlefield.getArmyPos(playerId);
  res.send(battlePosition[pieceLoc]);
};

const sendOpponentStatus = function(req,res){
  let game = req.app.game;
  if(game.areBothPlayerReady()){
    return res.redirect('/play');
  }
  res.status(202).send('wait..let opponent be ready');
};

app.use(log());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static('public'));
app.get("/createGame/:name",new CreateGameHandler().getRequestHandler());
app.post("/joinGame",new JoinGameHandler().getRequestHandler());
app.post('/setup/player/:playerId',setBattlefield);
app.get('/setupRedArmy',setupRedArmy);
app.get('/isOpponentReady',sendOpponentStatus);
app.get('/setupBlueArmy', setupBlueArmy);
app.get('/hasOpponentJoined', haveBothPlayersJoined);
app.get('/selectPiece/:playerId/:pieceLoc', getPieceFromLocation);
app.get('/play',(req,res)=>res.send('hello'));
module.exports = app;
