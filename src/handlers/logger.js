const fs = require('fs');
let morgan = require("morgan");
let accessLogStream = fs.createWriteStream("./logs/request.log", {flags: "a"});

morgan.token("cookies",function getCookies(req) {
  return JSON.stringify(req.cookies);
});

morgan.token("body",function getBody(req) {
  return JSON.stringify(req.body);
});
const logAndStoreRequest=function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.cookies(req,res),
    tokens.body(req,res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms"
  ].join(" ");
};

const log = function () {
  return morgan(logAndStoreRequest, {stream: accessLogStream});
};

exports.log = log;
