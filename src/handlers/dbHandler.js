const dbManager = require('../lib/dbManager.js');

const getPlayerName = function(game,sessionId){
  let playerId = game.getPlayerIndexBy(sessionId);
  let teamColor = game.getPlayerColorBy(playerId);
  return game.getPlayerName(teamColor);
};
const getInsertSetupQuery = (reqBody,gameType,userName)=>{
  let name=reqBody.setupName;
  delete reqBody.setupName;
  let setup=JSON.stringify(reqBody);
  let attributes = ["mode","name","setup","owner"];
  let values = [gameType,name,setup,userName];
  return dbManager.makeInsertQuery('setups',attributes,values);
};
class DbHandler{
  constructor(){}
  saveSetup(req,res) {
    let game = req.app.game;
    let gameType = req.app.game.getGameType();
    let client = req.app.getClient();
    let sessionId = req.cookies.sessionId;
    let userName = getPlayerName(game,sessionId);
    let insertqry = getInsertSetupQuery(req.body,gameType,userName);
    let resolver = function(data) {
      res.status(200).send("Ok");
    };
    let rejected = function(error) {
      console.log(error);
      res.status(406).end();
    };
    dbManager.executeQuery(client,insertqry,resolver,rejected);
  }
  getAllSetupName(req,res){
    let game = req.app.game;
    let gameType = req.app.game.getGameType();
    let client = req.app.getClient();
    let sessionId = req.cookies.sessionId;
    let userName = getPlayerName(game,sessionId);
    let attributes = ['index','name'];
    let condition=`mode='${gameType}' and owner='${userName}'`;
    let query = dbManager.makeRetrieveQueryOf('setups',condition,attributes);
    let resolver = function(data) {
      res.status(200).send(data.rows);
    };
    let rejected = function(error) {
      res.status(406).end();
    };
    dbManager.executeQuery(client,query,resolver,rejected);
  }
  renderSetup(req,res){
    let setupId = req.body.id;
    let client = req.app.getClient();
    let attributes = ['setup'];
    let condition=`index=${setupId}`;
    let query = dbManager.makeRetrieveQueryOf('setups',condition,attributes);
    let resolver = function(data) {
      res.status(200).send(data.rows[0].setup);
    };
    let rejected = function(error) {
      res.status(406).end();
    };
    dbManager.executeQuery(client,query,resolver,rejected);
  }
  signup(req,res){
    let userDetials = req.body;
    let client = req.app.getClient();
    let attributes = ['username','password','name'];
    let values = [userDetials.username,userDetials.password,userDetials.name];
    let query = dbManager.makeInsertQuery('users',attributes,values);
    let resolver = function(data) {
      res.status(200).send('Ok');
    };
    let rejected = function(error) {
      res.status(406).end();
    };
    dbManager.executeQuery(client,query,resolver,rejected);
  }
}
module.exports = DbHandler;
