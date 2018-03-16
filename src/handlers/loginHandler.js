const dbManager = require('../lib/dbManager.js');

class LoginHandler {
  constructor() {}
  execute(req,res){
    let username = req.body.username;
    let password = req.body.password;
    let condition = `username = '${username}' and password = '${password}'`;
    let query = dbManager.makeRetrieveQueryOf('users',condition);
    let client = req.app.getClient();
    
    let resolver = function(resp){
      if(resp.rows.length < 1){
        res.redirect('/index.html');
        return;
      }
      let sessionId = req.app.sessions.createSession(username);      
      res.cookie('sessionId',sessionId);
      let name = resp.rows[0].name;     
      res.cookie('name',name);
      res.redirect('/home.html');
    };
    let rejected = () => {
      res.status(406).end();
    };
    dbManager.executeQuery(client,query,resolver,rejected);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = LoginHandler;
