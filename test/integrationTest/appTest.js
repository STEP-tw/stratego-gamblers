const assert = require("chai").assert;
const request = require("supertest");
const Sessions = require("../../src/models/sessions.js");
const app = require("../../app.js");
app.sessions = new Sessions(()=>1234);
const Game = require("../../src/models/game");
const GamesHandler = require('../../src/handlers/gamesHandler.js');

describe('app', () => {
  beforeEach(() => {
    redArmyPos = ['3_2=2','3_9=B','2_3=2','2_6=B','1_1=S',
      '1_4=9','1_6=3','1_8=3','0_0=F','0_1=10'].join('&');
    blueArmyPos = ['9_2=2','9_9=B','8_3=2','8_6=B','7_1=S',
      '7_4=9','7_6=3','7_8=3','6_0=F','6_1=10'].join('&');
    let game = new Game(1);
    app.gamesHandler.createNewGame(1,game);
    app.game = app.gamesHandler.getGame(1);
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
  describe("GET /createGame", () => {
    it("responds with sharing key", done => {
      request(app)
        .post("/createGame")        
        .send('name=ravi&type=quick')
        .expect(200)
        .expect(/[\d]/)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end(done);
    });
    it("should not allow to create game with invalid name", done =>{
      request(app)
        .post("/createGame")
        .send('name=ra$%^vi&type=quick')        
        .expect(400)
        .end(done);
    });
    it("should not allow to create game without name and game type", done =>{
      request(app)
        .post("/createGame")
        .send('name=ravi')
        .expect(404)
        .end(done);
    });
  });
  describe('GET /hasOpponentJoined', () => {
    it("returns true if opponent is ready", done => {
      request(app)
        .get('/hasOpponentJoined')
        .set('cookie','gameId=1')
        .expect(200)
        .expect("false")
        .end(done);
    });
  });
  describe("POST /joinGame", () => {
    it("redirect joining player to home if game is not created ", done => {
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameId=10")
        .expect(400)
        .expect('Inavlid Player Name or Game Id')
        .end(done);
    });
    it("should not allow to join game without name and game id", done =>{
      request(app)
        .post("/joinGame")
        .send('name=ravi')
        .expect(404)
        .end(done);
    });
    beforeEach(() => {
      app.game.addPlayer("player1");
    });
    it("redirect valid joining player to battlefield", done => {
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameId=1")
        .expect(302)
        .expect("Location", "/setupArmy")
        .end(done);
    });
    it("redirect invalid joining player to home", done => {
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameId=2")
        .expect(400)
        .expect('Inavlid Player Name or Game Id')        
        .end(done);
    });
    it("redirect third joining player to home", done => {
      app.game.addPlayer("player2");
      request(app)
        .post("/joinGame")
        .send("name=ankur&gameId=1")
        .expect(302)
        .expect("Location","/")
        .end(done);
    });
    it("redirect joining player with white spaces as name to home", done => {
      request(app)
        .post("/joinGame")
        .send("name=  &gameId=1")
        .expect(400)
        .expect('Inavlid Player Name or Game Id')        
        .end(done);
    });
  });
  describe('GET /hasOpponentJoined', () => {
    it("returns false if opponent is not ready", done => {
      request(app)
        .get('/hasOpponentJoined')
        .set('cookie','gameId=1')
        .expect(200)
        .expect("false")
        .end(done);
    });
    it("returns true if opponent is ready", done => {
      app.game.addPlayer("player1");
      app.game.addPlayer("player2");
      request(app)
        .get('/hasOpponentJoined')
        .set('cookie','gameId=1')
        .expect(200)
        .expect("true")
        .end(done);
    });
  });
  describe('GET /play', () => {
    beforeEach(() => {
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
        .set('cookie',['sessionId=12345','gameId=1'])
        .expect(200)
        .expect(/battlefield/)
        .end(done);
    });
    it('should redirect to /setupArmy if both army not deployed', (done) => {
      request(app)
        .get('/play')
        .set('cookie', ['sessionId=12345','gameId=1'])
        .expect(302)
        .expect('Location','/setupArmy')
        .end(done);
    });
  });
  describe('GET /isOpponentReady', () => {
    beforeEach(() => {
      app.game.addPlayer("player1");
      app.game.addPlayer("player2");
    });
    it('should redirect with 202 when any of player is not ready', (done) => {
      request(app)
        .get('/isOpponentReady')
        .set('cookie','gameId=1')
        .expect(202)
        .expect(/Waiting for opponent to be ready/)
        .end(done);
    });
    it('should redirect to /play when both player are ready', (done) => {
      app.game.setBattlefieldFor(1, blueArmyPos);
      app.game.setBattlefieldFor(0, redArmyPos);
      request(app)
        .get('/isOpponentReady')
        .set('cookie','gameId=1')
        .expect(302)
        .expect('Location','/play')
        .end(done);
    });
  });
  describe('restart game GET /playAgain', () => {
    it('clear cookies and redirect to / if game is over', (done) => {
      request(app)
        .get('/playAgain')
        .set('cookie', 'sessionId=123456')
        .set('cookie', 'gameStatus=true')
        .expect('Location','/')
        .expect(302)
        .end(done);
    });
    it('should redirect to previous url if game is not over', (done) => {
      request(app)
        .get('/playAgain')
        .set('cookie', 'sessionId=123456')
        .set('cookie', 'previousUrl=/play')
        .expect('Location', '/play')
        .expect(302)
        .end(done);
    });
  });
  describe("GET /leave", () => {
    beforeEach(()=>{
      app.game.addPlayer("player1", 12345, 'red');
      app.game.addPlayer("player2", 123456, 'blue');
    });
    it('should redirect player to landing page', (done) => {
      request(app)
        .get('/leave')
        .set('cookie',['gameStatus=true','sessionId=12345','gameId=1'])
        .expect('location','/')
        .expect(302)
        .end(done);
    });
  });
  describe('GET /army', () => {
    it('should provide army strength details', (done) => {
      request(app)
        .get('/army')
        .set('cookie','gameId=1')
        .expect({'2': 2, '3': 2, '9': 1, '10': 1, 'F': 1, 'B': 2, 'S': 1} )
        .expect(200)
        .end(done);
    });
  });
});
