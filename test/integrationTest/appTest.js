const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');

describe('app', () => {
  describe("GET /index.html", () => {
    it("responds with home page", done => {
      request(app)
        .get("/index.html")
        .expect(200)
        .expect(/STRATREGO/)
        .expect(/JOIN GAME/)
        .expect("Content-Type", "text/html; charset=UTF-8")
        .end(done);
    });
  });
  describe('POST /setup/player/0', () => {
    it("resonds with home page", done => {
      request(app)
        .post('/setup/player/0')
        .send('0_0=F')
        .expect(200)
        .expect(/wait for opponent/)
        .end(done);
    });
  });
  describe('POST /setup/player/0', () => {
    it("resonds with home page", done => {
      request(app)
        .post('/setup/player/1')
        .send('0_0=F')
        .expect(302)
        .expect('location','/battlefield.html')
        .end(done);
    });
  });
  describe('GET /setupRedArmy', () => {
    it("should render setup page for player1", done => {
      request(app)
        .get('/setupRedArmy')
        .expect(200)
        .expect(/setupRedArmy.js/)
        .end(done);
    });
  });
  describe('GET /setupBlueArmy', () => {
    it("should render setup page for player2", done => {
      request(app)
        .get('/setupBlueArmy')
        .expect(200)
        .expect(/setupBlueArmy.js/)
        .end(done);
    });
  });

  describe('GET /createGame', () => {
    it("responds with sharing key", done => {
      request(app)
        .get('/createGame/ravi')
        .expect(200)
        .expect("1")
        .expect("Content-Type", "text/html; charset=utf-8")
        .end(done);
    });
  });
});
