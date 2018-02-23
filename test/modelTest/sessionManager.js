let chai = require('chai');
let assert = chai.assert;
let Sessions = require('../../src/models/sessions.js');

let sessions;
describe('Sessions', function () {
  beforeEach(function () {
    sessions = new Sessions(12345);
  });
  describe('#createSession', function () {
    it('should create session for Player', function () {
      let sessionid = sessions.createSession('ankur');
      assert.equal(sessionid, 12345);
      assert.deepEqual(sessions.sessions, {12345: "ankur"});
    });
  });
  describe('#isLoggedin', function () {
    it('should give true if given sessionid is present', function () {
      let sessionid = sessions.createSession('ankur');
      assert.ok(sessions.isLoggedin(sessionid));
    });
    it('should give false if given sessionid is not present', function () {
      assert.isNotOk(sessions.isLoggedin(45687));
    });
  });
  describe('#deleteSession', function () {
    it('should delete session for given sessionid', function () {
      let sessionid = sessions.createSession('ankur');
      assert.ok(sessions.isLoggedin(sessionid));
      sessions.deleteSession(sessionid);
      assert.isNotOk(sessions.isLoggedin(sessionid));
    });
  });
  describe('createSession',()=>{
    it('should create its own session when not provided',()=>{
      sessions = new Sessions();
      let sessionId = sessions.createSession();
      assert.match(sessionId,/[\d]/);
    });
  });
});
