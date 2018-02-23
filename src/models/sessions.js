const getTimeInSecond = require('../lib/utils.js').getTimeInSecond;
class Sessions {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.sessions = {};
  }
  createSession(playerName) {
    let sessionId = this.sessionId || getTimeInSecond();
    this.sessions[sessionId] = playerName;
    return sessionId;
  }
  getPlayerBySessionId(sessionId) {
    return this.sessions[sessionId];
  }
  deleteSession(sessionId) {
    let player = this.getPlayerBySessionId(sessionId);
    return delete this.sessions[sessionId];
  }
  isLoggedin(sessionId) {
    return sessionId in this.sessions;
  }
}

module.exports = Sessions;
