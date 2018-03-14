const app = require('../app');
module.exports = function (client) {
  app.getClient = function () {
    return client;
  };
  return app;
};
