const assert = require("chai").assert;
const request = require("supertest");
const pg = require("pg");
const getRequestHandler = require("../../src/routing.js");
const Game = require("../../src/models/game");
const LoginHandler = require('../../src/handlers/loginHandler.js');
let connectionString = 'postgres://localhost:5432/pranoyk';
let client = new pg.Client(connectionString);
// client.connect();
let app = getRequestHandler(client);
describe('Login Handler', () => {
  describe('GET /login.html',()=>{
    it('should serve login page', (done) => {
      request(app)
        .get('/login.html')
        .expect(200)
        .expect(/Login/)
        .end(done);
    });
  });
  describe.skip('post /login',()=>{
    it('should redirect to index page', (done) => {
      request(app)
        .post('/login')
        .send('username=ravij&password=12qw')
        .expect(302)
        .end(done);
    });
    it('should respond with 404 if username or password is invalid', (done) => {
      request(app)
        .post('/login')
        .send('username=invalid&password=12qw')
        .expect(404)
        .expect(/not found/)
        .end(done);
    });
  });
});
