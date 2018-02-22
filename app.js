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

const redirectToHome = function(req,res,next){
  let unauthorizedUrls = ['/play', '/setupArmy', '/battlefield',
    'isOpponentReady','/setup/player'];
  let game = req.app.game;
  let gameStatus = game && game.haveBothPlayersJoined();
  if(unauthorizedUrls.includes(req.url) && !gameStatus){
    res.redirect('/');
  }else{
    next();
  }
};
const setBattlefield = function(req, res) {
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
const haveBothPlayersJoined = function(req, res) {
  let game = req.app.game;
  res.send(game.haveBothPlayersJoined());
};
const getBattlefield = function(req, res) {
  let game = req.app.game;
  let playerId = req.cookies.sessionId;
  let playerIndex = game.getPlayerIndexBy(playerId);
  let battlefieldPos = game.getBattlefieldFor(playerIndex);
  let turnMessage = game.getTurnMessage(playerIndex);
  let respond = {'battlefield':battlefieldPos,'turnMessage':turnMessage};
  res.send(JSON.stringify(respond));
};
const setupArmy = function(req, res) {
  let setupTemp = req.app.fs.readFileSync('./templates/setupArmy', 'utf8');
  let game = req.app.game;
  let playerId = req.cookies.sessionId;
  let teamColor = game.getPlayerColorBy(playerId);
  setupTemp = setupTemp.replace('{{team}}', teamColor);
  let name = game.getPlayerName(teamColor);
  setupTemp = setupTemp.replace('{{playerName}}', name);
  res.send(setupTemp);
};
const sendOpponentStatus = function(req, res) {
  let game = req.app.game;
  if (game.areBothPlayerReady()) {
    game.createBattlefield();
    return res.redirect('/play');
  }
  res.status(202).send('wait..let opponent be ready');
};
const renderGamePage = function(req, res) {
  let game = req.app.game;
  let battlefield = req.app.fs.readFileSync('./templates/battlefield', 'utf8');
  let playerId = req.cookies.sessionId;
  let teamColor = game.getPlayerColorBy(playerId);
  let myName = game.getPlayerName(teamColor);
  let opponent = game.getOpponentName(teamColor);
  battlefield = battlefield.replace('{{team}}',teamColor);
  battlefield = battlefield.replace('{{myname}}',myName);
  battlefield = battlefield.replace('{{opponent}}',opponent);
  res.send(battlefield);
};
const updateBattlefield = function(req,res){
  let game = req.app.game;
  let sessionId = req.cookies.sessionId;
  let location = req.body.location;
  let playerId = game.getPlayerIndexBy(sessionId);
  if(game.isCurrentPlayer(playerId)){
    game.updatePieceLocation(location);
    res.status(200);
    res.end();
    return;
  }
  res.status(406);
  res.send('invalid request');
  res.end();
};
const validatePlayerStatus=function(req,res,next){
  let game = req.app.game;
  if(game.areBothPlayerReady()){
    next();
  }else{
    res.redirect('/setupArmy');
  }
};
const getKilledPieces = function(req,res){
  let game = req.app.game;
  let players = game.getPlayers();
  let redCapturedArmy = players[0].getKilledPieces();
  let blueCapturedArmy = players[1].getKilledPieces();
  let killedPieces = {redArmy:redCapturedArmy,blueArmy:blueCapturedArmy};
  res.send(killedPieces);
};

app.use(log());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(express.static('public'));
app.use(redirectToHome);
app.get("/createGame/:name", new CreateGameHandler().getRequestHandler());
app.post("/joinGame", new JoinGameHandler().getRequestHandler());
app.post('/setup/player/:playerId', setBattlefield);
app.get('/setupArmy', setupArmy);
app.get('/isOpponentReady', sendOpponentStatus);
app.get('/hasOpponentJoined', haveBothPlayersJoined);
app.use('/play',validatePlayerStatus);
app.get('/play', renderGamePage);
app.get('/battlefield', getBattlefield);
app.post('/selectedLoc',updateBattlefield);
app.get('/killedPieces',getKilledPieces);
module.exports = app;
