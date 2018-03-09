const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const log = require("./src/handlers/logger.js").log;
const Sessions = require('./src/models/sessions.js');
const CreateGameHandler = require('./src/handlers/createGameHandler.js');
const JoinGameHandler = require('./src/handlers/joinGameHandler.js');
const BattlefieldHandler = require('./src/handlers/battlefieldHandler.js');
const ExitHandler = require('./src/handlers/exitHandler.js');
const battlefieldHandler = new BattlefieldHandler();
const GamesHandler = require('./src/handlers/gamesHandler.js');
const dbManager = require('./src/lib/dbManager.js');
const lib = require('./src/lib/lib.js');

app.fs = fs;
app.sessions = new Sessions();
app.gamesHandler = new GamesHandler();

const loadGame = function(req,res,next){
  let gamesHandler = req.app.gamesHandler;
  let gameId = req.cookies.gameId;
  req.app.game = gamesHandler.getGame(gameId);
  next();
};

const checkForGame = function(req,res,next){
  let game = req.app.game;
  if(!game){
    res.redirect('/');
    return;
  }
  next();
};

const checkForSetup = function (req, res, next) {
  let game = req.app.game;
  if (!game.haveBothPlayersJoined()){
    res.redirect('/');
    return;
  }
  next();
};

const checkForGameInPlay = function(req,res,next){
  let game = req.app.game;
  let previousUrl = req.cookies.previousUrl;
  if (game.areBothPlayerReady()){
    res.redirect(previousUrl);
    return;
  }
  next();
};

const checkForAjaxRequest = function(req,res,next){
  if(req.headers.accept=='*/*'){
    next();
    return;
  }
  let previousUrl = req.cookies.previousUrl;
  res.redirect(previousUrl);
};

const haveBothPlayersJoined = function(req, res) {
  let game = req.app.game;
  res.send(game.haveBothPlayersJoined());
};

const sendArmyDetails = function(req,res){
  let game = req.app.game;
  res.json(game.getArmy());
};

const setupArmy = function(req, res) {
  let setupTemp = req.app.fs.readFileSync('./templates/setupArmy', 'utf8');
  let game = req.app.game;
  let sessionId = req.cookies.sessionId;
  let playerId = game.getPlayerIndexBy(sessionId);
  let teamColor = game.getPlayerColorBy(playerId);
  setupTemp = setupTemp.replace(/{{team}}/g,teamColor);
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
  let sessionId = req.cookies.sessionId;
  let playerId = game.getPlayerIndexBy(sessionId);
  let teamColor = game.getPlayerColorBy(playerId);
  let myName = game.getPlayerName(teamColor);
  let opponent = game.getOpponentName(teamColor);
  battlefield = battlefield.replace(/{{team}}/g,teamColor);
  battlefield = battlefield.replace('{{myname}}', myName);
  battlefield = battlefield.replace('{{opponent}}', opponent);
  res.send(battlefield);
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

const saveSetup = function (req,res,next) {
  let gameType = req.app.game.getGameType();
  let client = req.app.getClient();
  let insertqry = lib.getInsertQuery(req.body,gameType);
  if(dbManager.executeQuery(client,insertqry)){
    res.end();
    return;
  }
  res.status(500).send();
};

const invalidUrlsBeforeSetup = ['/play', '/battlefield',
  '/selectedLoc','/leave','/revealedBattlefield',
  '/battlefieldChanges','/selectedLoc','/playAgain'];

const invalidUrlsAfterSetup = ['/setupArmy','/army',
  '/setup/player/:playerId','/createGame','/joinGame'];

const ajaxRequest = ['/battlefield','/battlefieldChanges',
  '/army','/revealedBattlefield'];

app.use(['/setupArmy','/play'],loadPreviousUrl);
app.use(log());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(loadGame);
app.use(express.static('public'));
app.post("/createGame", new CreateGameHandler().getRequestHandler());
app.post("/joinGame", new JoinGameHandler().getRequestHandler());
app.use(checkForGame);
app.use(invalidUrlsBeforeSetup, checkForSetup);
app.use(invalidUrlsAfterSetup, checkForGameInPlay);
app.use(ajaxRequest,checkForAjaxRequest);
app.get('/setupArmy', setupArmy);
app.get('/hasOpponentJoined', haveBothPlayersJoined);
app.get('/isOpponentReady', sendOpponentStatus);
app.post('/setup/player/:playerId', battlefieldHandler.setBattlefield);
app.get('/army',sendArmyDetails);
app.use('/play', validatePlayerStatus);
app.get('/play', renderGamePage);
app.get('/battlefield', battlefieldHandler.getBattlefield);
app.get('/battlefieldChanges',battlefieldHandler.getBattlefieldChanges);
app.get('/revealedBattlefield',battlefieldHandler.getRevealedBattlefield);
app.post('/selectedLoc', battlefieldHandler.updateBattlefield);
app.get('/playAgain', new ExitHandler().restartGameHandler());
app.get('/leave', new ExitHandler().quitGameHandler());
app.post('/saveSetup',saveSetup);
module.exports = app;
