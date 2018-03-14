const dbManager = require('../lib/dbManager.js');

const getInsertQuery = (reqBody,gameType)=>{
  let name=reqBody.setupName;
  delete reqBody.setupName;
  let setup=JSON.stringify(reqBody);
  let attributes = ["mode","name","setup"];
  let values = [gameType,name,setup];
  return dbManager.makeInsertQuery('setups',attributes,values);
};
class DbHandler{
  constructor(){}
  saveSetup(req,res) {
    let gameType = req.app.game.getGameType();
    let client = req.app.getClient();
    let insertqry = getInsertQuery(req.body,gameType);
    let resolver = function(data) {
      res.status(200).send("Ok");
    };
    let rejected = function(error) {
      res.status(500).end();
    };
    dbManager.executeQuery(client,insertqry,resolver,rejected);
  }
  getAllSetupName(req,res){
    let gameType = req.app.game.getGameType();
    let client = req.app.getClient();
    let attributes = ['index','name'];
    let condition=`mode='${gameType}'`;
    let query = dbManager.makeRetrieveQueryOf('setups',condition,attributes);
    let resolver = function(data) {
      res.status(200).send(data.rows);
    };
    let rejected = function(error) {
      res.status(500).end();
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
      res.status(500).end();
    };
    dbManager.executeQuery(client,query,resolver,rejected);
  }
}
module.exports = DbHandler;
