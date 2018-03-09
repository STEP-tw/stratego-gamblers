const assert = require("chai").assert;
const request = require("supertest");
const app = require("../../app.js");
const Game = require("../../src/models/game");
const GamesHandler = require('../../src/handlers/gamesHandler.js');

describe('BattleFieldHandler', () => {
  beforeEach(() => {
    let game = new Game(1);
    app.gamesHandler.createNewGame(1,game);
    app.game = app.gamesHandler.getGame(1);
    app.game.loadPieces();
    app.game.addPlayer("player1",12345,'red');
    app.game.addPlayer("player2",123456,'blue');
    let redArmyPos = {'3_2':'2','3_9':'B'};
    let blueArmyPos = {'9_2':'2','9_9':'B'};
    app.game.setBattlefieldFor(0,redArmyPos);
    app.game.setBattlefieldFor(1, blueArmyPos);
  });
  describe('GET /battlefield', () => {
    it('should respond with battlefield of given player', (done) => {
      request(app)
        .get('/battlefield')
        .set('cookie',['sessionId=12345','gameId=1'])
        .expect(200)
        .expect(/"3_2":"2","3_9":"B","9_2":"O","9_9":"O"/)
        .end(done);
    });
  });
  describe('#updateBattlefield',()=>{
    it('should response potential moves with game status',(done)=>{
      request(app)
        .post('/selectedLoc')
        .set('cookie',['sessionId=12345','gameId=1'])
        .send('location=0_0')
        .expect(200)
        .end(done);
    });
    it('should response with 406 for player without his own turn',(done)=>{
      request(app)
        .post('/selectedLoc')
        .set('cookie',['sessionId=123456','gameId=1'])
        .send('location=3_2')
        .expect(406)
        .expect(/invalid request/)
        .end(done);
    });
    it('should return revealed army after game is over',(done)=>{
      app.game.battlefield.revealPieces = {'2_2':'4'};
      request(app)
        .post('/selectedLoc')
        .set('cookie',['sessionId=12345','gameId=1'])
        .expect(200)
        .expect('')
        .end(done);
    });
  });
  describe('/battlefieldChanges',()=>{
    describe('game in play',()=>{
      it('should reponse with changes which are currently made', (done) => {
        app.game.timeStamp = new Date().getTime()+1000;      
        request(app)
          .get('/battlefieldChanges')   
          .set('cookie',['sessionId=12345','gameId=1'])
          .expect(200)
          .expect(/updatedLocs/)
          .expect(/turnMsg/)
          .end(done);
      });
      it('should respond nothing if board is not updated', (done) => {
        app.game.timeStamp = new Date().getTime()-1000;
        request(app)
          .get('/battlefieldChanges')
          .set('cookie',['sessionId=12345','gameId=1'])
          .expect(200)
          .expect('')
          .end(done);
      });
      it('should respond with revealed piece', (done) => {
        app.game.timeStamp = new Date().getTime()+1000;
        app.game.battlefield.revealPieces = 
        {0:{pos:'3_2',pieceId:'2'},1:{pos:'9_2',pieceId:'2'}};
        request(app)
          .get('/battlefieldChanges')
          .set('cookie',['sessionId=12345','gameId=1'])
          .expect(200)
          .expect(/"loc":"9_2","pieceId":"O_2"/)
          .end(done);
      });
    });
    describe('game over',()=>{
      beforeEach(()=>{
        app.game.timeStamp = new Date().getTime()+10000;
        app.game.gameOver = true;
        app.game.winner = 12345;
      });
      it('should respond with win status when game is over', (done) => {
        request(app)
          .get('/battlefieldChanges')
          .set('cookie',['sessionId=12345','gameId=1'])
          .expect(200)
          .expect(/"gameOver":true,"winner":"win"/)
          .end(done);
      });
      it('should respond with lost status when game is over', (done) => {
        request(app)
          .get('/battlefieldChanges')
          .set('cookie',['sessionId=123456','gameId=1'])
          .expect(200)
          .expect(/"gameOver":true,"winner":"lose"/)
          .end(done);
      });
      it('should respond with surrender when a player leave the game',(done)=>{
        app.game.gameOver = 'quit';       
        request(app)
          .get('/battlefieldChanges')
          .set('cookie',['sessionId=123456','gameId=1'])
          .expect(200)
          .expect(/"gameOver":"quit","winner":"surrender"/)
          .end(done);
      });
    });
  });
  describe('revealedBattlefield', () => {
    it('should return complete revealed battlefield',(done)=>{
      app.game.gameOver=true;
      request(app)
        .get('/revealedBattlefield')
        .set('cookie',['sessionId=12345','gameId=1'])
        .expect(200)
        .expect(/"3_2":"2","3_9":"B","9_2":"O_2","9_9":"O_B"/)
        .end(done);
    });
    it('should redirect to previous url if game is not over',(done)=>{
      request(app)
        .get('/revealedBattlefield')
        .set('cookie',['sessionId=12345','gameId=1', 'previousUrl=/play'])
        .expect(302)
        .expect('location','/play')
        .end(done);
    });
  });
  describe('GET /battlefield', () => {
    beforeEach(() => {
      app.game=undefined;
    });
    it('should redirect to / if there is no game', (done) => {
      request(app)
        .get('/battlefield')
        .expect(302)
        .expect('Location','/')
        .end(done);
    });
  });
});
