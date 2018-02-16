const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');

describe('function', () => {
  describe("GET /home.html", () => {
    it("resonds with home page", done => {
      request(app)
        .get("/home.html")
        .expect(200)
        .expect(/STRATREGO/)
        .expect(/JOIN GAME/)
        .expect("Content-Type", "text/html; charset=UTF-8")
        .end(done);
    });
  });
  describe('POST /setup/player/0',()=>{
    it("resonds with home page", done => {    
      request(app)
        .post('/setup/player/0')
        .send('0_0=F')
        .expect(200)
        .expect(/wait for opponent/)        
        .end(done);
    });      
  });
  describe('POST /setup/player/0',()=>{
    it("resonds with home page", done => {    
      request(app)
        .post('/setup/player/1')
        .send('0_0=F')
        .expect(200)
        .expect(/show battle field/)
        .end(done);
    });      
  });
});
