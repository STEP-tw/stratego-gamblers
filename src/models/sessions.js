const getTimeInSecond = () => new Date().getTime();
class Sessions {
  constructor(sessionIdGenerator = getTimeInSecond, sessions) {
    this.sessionIdGenerator = sessionIdGenerator;
    this.sessions = sessions || {};
  }
  createSession(playerName) {
    let sessionId = this.sessionIdGenerator();
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
