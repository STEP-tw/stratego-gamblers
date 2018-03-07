const assert = require("chai").assert;
const request = require("supertest");
const app = require("../../app.js");
const Game = require("../../src/models/game");
const GamesHandler = require('../../src/handlers/gamesHandler.js');

describe('setup',()=>{
  beforeEach(()=>{
    let game = new Game(1);
    app.gamesHandler.createNewGame(1,game);
    app.game = app.gamesHandler.getGame(1);
    app.game.addPlayer("player1", 12345, 'red');
    app.game.addPlayer("player2", 123456, 'blue');
    redArmyPos = ['3_2=2','3_9=B','2_3=2','2_6=B','1_1=S',
      '1_4=9','1_6=3','1_8=3','0_0=F','0_1=10'].join('&');
    blueArmyPos = ['9_2=2','9_9=B','8_3=2','8_6=B','7_1=S',
      '7_4=9','7_6=3','7_8=3','6_0=F','6_1=10'].join('&');
  });
  describe("POST /setup/player/0", () => {
    it("should return status with missing piece", done => {
      request(app)
        .post("/setup/player/0")
        .set('cookie','gameId=1')
        .send("0_0=4")
        .expect(206)
        .expect(/pieces or location missing!/)
        .end(done);
    });
    it("should not set army for wrong number of pieces", done => {
      let armyPos = ['3_2=2','3_9=B','2_3=2','2_6=B','1_1=S',
        '1_4=9','1_6=3','1_8=3','0_0=F','0_1=10','0_6=10'].join('&');
      request(app)
        .post('/setup/player/0')
        .set('cookie','gameId=1')        
        .send(armyPos)
        .expect(206)
        .expect(/pieces or location missing!/)
        .end(done);
    });
    it("should set army for given player and return status with OK", done => {
      request(app)
        .post("/setup/player/0")
        .set('cookie','gameId=1')        
        .send(redArmyPos)
        .expect(200)
        .end(done);
    });
  });
  describe('POST /setup/player/1', () => {
    it("should set army for another player and responds with OK", done => {
      request(app)
        .post("/setup/player/1")
        .set('cookie','gameId=1')        
        .send(blueArmyPos)
        .expect(200)
        .end(done);
    });
  });
  describe('Use /setup/player/:playerId',()=>{
    it("should return last URL if both players are already setup", done => {
      let redArmyPos = {'3_2': '2', '3_9': 'B'};
      let blueArmyPos = {'9_2': '2', '9_9': 'B'};
      app.game.setBattlefieldFor(0, redArmyPos);
      app.game.setBattlefieldFor(1, blueArmyPos);
      request(app)
        .get("/setup/player/1")
        .set('cookie', ['sessionId=123456','previousUrl=/play','gameId=1'])
        .expect(302)
        .expect('location','/play')
        .end(done);
    });
  });
  describe("SetupPage", () => {
    describe("GET /setupArmy", () => {
      it("should render setup page for player1", done => {
        request(app)
          .get("/setupArmy")
          .set('cookie', ['sessionId=12345','gameId=1'])
          .expect(200)
          .expect(/redSetup.js/)
          .expect(/player1/)
          .end(done);
      });
    });
    describe("GET /setupArmy", () => {
      it("should render setup page for player2", done => {
        request(app)
          .get("/setupArmy")
          .set('cookie', ['sessionId=123456','gameId=1'])          
          .expect(200)
          .expect(/blueSetup.js/)
          .expect(/player2/)
          .end(done);
      });
    });
  });
});
