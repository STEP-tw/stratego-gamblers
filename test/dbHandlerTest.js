const assert = require('chai').assert;
const request = require("supertest");
const getReqHandler = require('../src/routing');
const pg = require('pg');
// let alternate = "postgres://localhost:5432/rahul";
// let connectionString = process.env.DATABASE_URL || alternate;
// const client = new pg.Client(connectionString);
// client.connect().then(()=>{
//   console.log('connected');
// }).catch(()=>{
//   console.log('not connected to db');
// });
// const app = getReqHandler(client);
const dbHandler = require('../src/handlers/dbHandler.js');
const Game = require("../src/models/game");
const GamesHandler = require('../src/handlers/gamesHandler.js');

describe.skip('description', () => {
  beforeEach(() => {
    let game = new Game(1);
    game.type = 'quickGame';
    app.gamesHandler.createNewGame(1,game);
    app.game = app.gamesHandler.getGame(1);
  });
  describe('POST /saveSetup', () => {
    beforeEach(()=>{
      app.game.addPlayer("player1", 12345, 'red');
      app.game.addPlayer("player2", 123456, 'blue');
    });
    it('should save the setup details', (done) => {
      request(app)
        .post('/saveSetup')
        .set('cookie','gameId=1')
        .send('4=3&9=2&12=3&13=S&15=F&20=B&21=9&25=B&31=2&36=10&setupName=new')
        .expect(200)
        .end(done);
    }); 
    it('should respond with 406 when setup data is invalid', (done) => {
      request(app)
        .post('/saveSetup')
        .set('cookie','gameId=1')
        .send('4=3&9=2&12=3&13=S&15=F&20=B&21=9&25=B&31=2&36=10&setupName=new')
        .expect(406)
        .end(done);
    });
  });
  describe('GET /setupNames', () => {
    it('should give back all the setup for given game type', (done) => {
      app.game.gameType = 'invalid';
      request(app)
        .get('/setupNames')
        .set('cookie','gameId=1')
        .expect(406)
        .end(done);
    });
    it('should give back all the setup for given game type', (done) => {
      request(app)
        .get('/setupNames')
        .set('cookie','gameId=10')
        .expect(200)
        .end(done);
    });
  });
  describe('POST /loadSetup', () => {
    it('should render setup details of given setup id', (done) => {
      request(app)
        .post('/loadSetup')
        .set('accept','*/*')
        .set('cookie','gameId=1')
        .send('id=1')
        .expect(200)
        .end(done);
    });
    it('should respond with 406 when given setup is not present', (done) => {
      request(app)
        .post('/loadSetup')
        .set('cookie','gameId=1')
        .send('id=-1')
        .expect(406)
        .end(done);
    });
  });
});
