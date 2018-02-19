let chai = require('chai');
let assert = chai.assert;
let SessionManager = require('../../src/models/sessionManager.js');

const idGenerator = () => 12345;
let sessionManager;
describe('SessionManager', function () {
  beforeEach(function () {
    sessionManager = new SessionManager(idGenerator);
  });
  describe('#createSession', function () {
    it('should create session for Player', function () {
      let sessionid = sessionManager.createSession('ankur');
      assert.equal(sessionid, 12345);
      assert.deepEqual(sessionManager.sessions, {12345: "ankur"});
    });
  });
  describe('#isLoggedin', function () {
    it('should give true if given sessionid is present', function () {
      let sessionid = sessionManager.createSession('ankur');
      assert.ok(sessionManager.isLoggedin(sessionid));
    });
    it('should give false if given sessionid is not present', function () {
      assert.isNotOk(sessionManager.isLoggedin(45687));
    });
  });
  describe('#deleteSession', function () {
    it('should delete session for given sessionid', function () {
      let sessionid = sessionManager.createSession('ankur');
      assert.ok(sessionManager.isLoggedin(sessionid));
      sessionManager.deleteSession(sessionid);
      assert.isNotOk(sessionManager.isLoggedin(sessionid));
    });
  });
});