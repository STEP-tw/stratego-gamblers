const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const log = require("./src/handlers/logger.js").log;
const isGameOver = require('./src/lib/lib.js').isGameOver;
const Sessions = require('./src/models/sessions.js');
const CreateGameHandler = require('./src/handlers/createGameHandler.js');
const JoinGameHandler = require('./src/handlers/joinGameHandler.js');
const BattlefieldHandler = require('./src/handlers/battlefieldHandler.js');
const battlefieldHandler = new BattlefieldHandler();

app.fs = fs;
app.sessions = new Sessions();

const redirectToHome = function (req, res, next) {
  let game = req.app.game;
  let gameStatus = game && game.haveBothPlayersJoined();
  if (!gameStatus) {
    res.redirect('/');
  } else {
    next();
  }
};

const haveBothPlayersJoined = function(req, res) {
  let game = req.app.game;
  res.send(game.haveBothPlayersJoined());
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

const sendOpponentStatus = function (req, res) {
  let game = req.app.game;
  if (game.areBothPlayerReady()) {
    game.createBattlefield();
    return res.redirect('/play');
  }
  res.status(202).send('Waiting for opponent to be ready');
};

const renderGamePage = function (req, res) {
  let game = req.app.game;
  let battlefield = req.app.fs.readFileSync('./templates/battlefield', 'utf8');
  let playerId = req.cookies.sessionId;
  let teamColor = game.getPlayerColorBy(playerId);
  let myName = game.getPlayerName(teamColor);
  let opponent = game.getOpponentName(teamColor);
  battlefield = battlefield.replace(/{{team}}/g,teamColor);
  battlefield = battlefield.replace('{{myname}}', myName);
  battlefield = battlefield.replace('{{opponent}}', opponent);
  res.send(battlefield);
};

const restartGame = function (req, res) {
  let previousUrl = req.cookies.previousUrl;
  let game = req.app.game;
  let gameStatus = req.cookies.gameStatus;
  if (isGameOver(game,gameStatus)) {
    delete req.app.game;
    res.clearCookie('sessionId');
    res.clearCookie('gameStatus');
    return res.redirect('/');
  }
  res.redirect(previousUrl);
};

const loadPreviousUrl=function(req,res,next){
  res.cookie('previousUrl', req.baseUrl);
  next();
};

const validatePlayerStatus = function (req, res, next) {
  let game = req.app.game;
  if (game.areBothPlayerReady()) {
    next();
  } else {
    res.redirect('/setupArmy');
  }
};

const unauthorizedUrls = ['/play', '/setupArmy', '/battlefield',
  'isOpponentReady', '/setup/player/:playerId',
  '/selectedLoc'
];
app.use(['/setupArmy','/play'],loadPreviousUrl);
app.use(log());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(unauthorizedUrls, redirectToHome);

app.use(express.static('public'));
app.get("/createGame/:name", new CreateGameHandler().getRequestHandler());
app.post("/joinGame", new JoinGameHandler().getRequestHandler());
app.post('/setup/player/:playerId', battlefieldHandler.setBattlefieldHandler());
app.get('/setupArmy', setupArmy);
app.get('/isOpponentReady', sendOpponentStatus);
app.get('/hasOpponentJoined', haveBothPlayersJoined);
app.use('/play', validatePlayerStatus);
app.get('/play', renderGamePage);
app.get('/battlefield', battlefieldHandler.getBattlefieldHandler());
app.post('/selectedLoc', battlefieldHandler.updateBattlefieldHandler());
app.get('/playAgain', restartGame);
module.exports = app;
