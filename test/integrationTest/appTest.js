const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');

describe('app', () => {
  describe("GET /home.html", () => {
    it("responds with home page", done => {
      request(app)
        .get("/home.html")
        .expect(200)
        .expect(/STRATREGO/)
        .expect(/JOIN GAME/)
        .expect("Content-Type", "text/html; charset=UTF-8")
        .end(done);
    });
  });
  describe('POST /setup/0',()=>{
    it("responds with home page", done => {
      request(app)
        .post('/setup/0')
        .send({'0_0':'F'})
        .expect(200)
        .end(done);
    });
  });
  describe('POST /gameId',()=>{
    it("responds with sharing key", done => {
      request(app)
        .post('/gameId')
        .send("name=ravi")
        .expect(200)
        .expect(/ravi/)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end(done);
    });
  });
});
