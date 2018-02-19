const getTimeInSecond = () => new Date().getTime();
class SessionManager {
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
    let Player = this.getPlayerBySessionId(sessionId);
    if (Player) {
      return delete this.sessions[sessionId];
    }
    return false;
  }
  isLoggedin(sessionId) {
    return sessionId in this.sessions;
  }
}

module.exports = SessionManager;
