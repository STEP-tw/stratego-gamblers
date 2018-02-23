const assert = require("chai").assert;
const request = require("supertest");
const Sessions = require("../../src/models/sessions.js");
const app = require("../../app.js");
app.sessions = new Sessions(()=>1234);
const Game = require("../../src/models/game");
describe('app', () => {
  beforeEach(() => {
    redArmyPos = ['3_2=2','3_9=B','2_3=2','2_6=B','1_1=S',
      '1_4=9','1_6=3','1_8=3','0_0=F','0_1=10'].join('&');
    blueArmyPos = ['9_2=2','9_9=B','8_3=2','8_6=B','7_1=S',
      '7_4=9','7_6=3','7_8=3','6_0=F','6_1=10'].join('&');
  });
  describe("GET /index.html", () => {
    it("responds with home page", done => {
      request(app)
        .get("/index.html")
        .expect(200)
        .expect(/Create Game/)
        .expect(/Join Game/)
        .expect("Content-Type", "text/html; charset=UTF-8")
        .end(done);
    });
  });
  describe("POST /setup/player/0", () => {
    beforeEach(
      () =>{
        app.game = new Game();
        app.game.addPlayer("player1", 12345, 'red');
        app.game.addPlayer("player2", 123456, 'blue');
      });
    it("should return status with missing piece", done => {
      request(app)
        .post("/setup/player/0")
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
        .send(armyPos)
        .expect(206)
        .expect(/pieces or location missing!/)
        .end(done);
    });
    it("should set army for given player and return status with OK", done => {
      request(app)
        .post("/setup/player/0")
        .send(redArmyPos)
        .expect(200)
        .end(done);
    });
  });
  describe('POST /setup/player/1', () => {
    it("should set army for another player and responds with OK", done => {
      request(app)
        .post("/setup/player/1")
        .send(blueArmyPos)
        .expect(200)
        .end(done);
    });
  });
  describe("SetupPage", () => {
    beforeEach(() => {
      app.game = new Game();
      app.game.addPlayer("player1",12345,'red');
      app.game.addPlayer("player2",123456,'blue');
    });
    describe("GET /setupArmy", () => {
      it("should render setup page for player1", done => {
        request(app)
          .get("/setupArmy")
          .set('cookie', 'sessionId=12345')
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
          .set('cookie', 'sessionId=123456')
          .expect(200)
          .expect(/blueSetup.js/)
          .expect(/player2/)
          .end(done);
      });
    });
  });
  describe("GET /createGame/:name", () => {
    it("responds with sharing key", done => {
      request(app)
        .get("/createGame/ravi")
        .expect(200)
        .expect("1")
        .expect("Content-Type", "text/html; charset=utf-8")
        .end(done);
    });
  });
  describe('GET /hasOpponentJoined', () => {
    it("returns true if opponent is ready", done => {
      request(app)
        .get('/hasOpponentJoined')
        .expect(200)
        .expect("false")
        .end(done);
    });
  });
  describe("POST /joinGame", () => {
    it("redirect joining player to home if game is not created ", done => {
      app.game = undefined;
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameid=1")
        .expect(302)
        .expect("Location","/")
        .end(done);
    });
    beforeEach(() => {
      app.game = new Game(1);
      app.game.addPlayer("player1");
    });
    it("redirect valid joining player to battlefield", done => {
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameid=1")
        .expect(302)
        .expect("Location", "/setupArmy")
        .end(done);
    });
    it("redirect invalid joining player to home", done => {
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameid=2")
        .expect(302)
        .expect("Location", "/")
        .end(done);
    });
    it("redirect third joining player to home", done => {
      app.game.addPlayer("player2");
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameid=1")
        .expect(302)
        .expect("Location","/")
        .end(done);
    });
    it("redirect joining player with white spaces as name to home", done => {
      request(app)
        .post("/joinGame")
        .send("name=  &gameid=1")
        .expect(302)
        .expect("Location","/")
        .end(done);
    });
  });
  describe('GET /hasOpponentJoined', () => {
    beforeEach(
      () => {
        app.game = new Game(1);
        app.game.addPlayer("player1");
      }
    );
    it("returns false if opponent is not ready", done => {
      request(app)
        .get('/hasOpponentJoined')
        .expect(200)
        .expect("false")
        .end(done);
    });
    it("returns true if opponent is ready", done => {
      app.game.addPlayer("player2");
      request(app)
        .get('/hasOpponentJoined')
        .expect(200)
        .expect("true")
        .end(done);
    });
  });
  describe('GET /play', () => {
    beforeEach(() => {
      app.game = new Game();
      app.game.addPlayer("player1", 12345, 'red');
      app.game.addPlayer("player2", 123456, 'blue');
    });
    it('should respond with corresponding game page of player', (done) => {
      let redArmyPos = {'3_2': '2', '3_9': 'B'};
      let blueArmyPos = {'9_2': '2', '9_9': 'B'};
      app.game.setBattlefieldFor(0, redArmyPos);
      app.game.setBattlefieldFor(1, blueArmyPos);
      request(app)
        .get('/play')
        .set('cookie','sessionId=12345')
        .expect(200)
        .expect(/battlefield/)
        .end(done);
    });
    it('should redirect to /setupArmy if both army not deployed', (done) => {
      request(app)
        .get('/play')
        .set('cookie', 'sessionId=12345')
        .expect(302)
        .expect('Location','/setupArmy')
        .end(done);
    });
  });
  describe('GET /isOpponentReady', () => {
    beforeEach(() => {
      app.game = new Game();
      app.game.addPlayer("player1");
      app.game.addPlayer("player2");
    });
    it('should redirect with 202 when any of player is not ready', (done) => {
      request(app)
        .get('/isOpponentReady')
        .expect(202)
        .expect(/Waiting for opponent to be ready/)
        .end(done);
    });
    it('should redirect to /play when both player are ready', (done) => {
      app.game.setBattlefieldFor(1, blueArmyPos);
      app.game.setBattlefieldFor(0, redArmyPos);
      request(app)
        .get('/isOpponentReady')
        .expect(302)
        .expect('Location','/play')
        .end(done);
    });
  });
  describe('GET /battlefield', () => {
    beforeEach(() => {
      app.game = new Game();
      app.game.addPlayer("player1",12345,'red');
      app.game.addPlayer("player2",123456,'blue');
      let redArmyPos = {'3_2':'2','3_9':'B'};
      let blueArmyPos = {'9_2':'2','9_9':'B'};
      app.game.setBattlefieldFor(0,redArmyPos);
      app.game.setBattlefieldFor(1, blueArmyPos);
      app.game.players[0].kill('2');
    });
    it('should respond with battlefield of given player', (done) => {
      request(app)
        .get('/battlefield')
        .set('cookie','sessionId=12345')
        .expect(200)
        .expect(/"3_2":"2","3_9":"B","9_2":"O","9_9":"O"/)
        .end(done);
    });
  });
  describe('#updateBattlefield',()=>{
    beforeEach(() => {
      app.game = new Game();
      app.game.addPlayer("player1",12345,'red');
      app.game.addPlayer("player2",123456,'blue');
      let redArmyPos = {'0_0':'3','0_1':'B'};
      let blueArmyPos = {'9_2':'3','9_9':'B'};
      app.game.setBattlefieldFor(0,redArmyPos);
      app.game.setBattlefieldFor(1, blueArmyPos);
    });
    it('should response potential moves with game status',(done)=>{
      request(app)
        .post('/selectedLoc')
        .set('cookie','sessionId=12345')
        .send('location=0_0')
        .expect(200)
        .end(done);
    });
    it('should response with 406 for in valid player ',(done)=>{
      request(app)
        .post('/selectedLoc')
        .set('cookie','sessionId=123456')
        .send('location=3_2')
        .expect(406)
        .expect(/invalid request/)
        .end(done);
    });
  });
  describe('GET /battlefield', () => {
    it('should redirect to / if there is no game', (done) => {
      app.game=undefined;
      request(app)
        .get('/battlefield')
        .expect(302)
        .expect('Location','/')
        .end(done);
    });
  });
});
