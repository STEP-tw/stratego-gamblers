const express = require('express');
const cookieParser =require('cookie-parser');
const app = express();
const log = require("./src/handlers/logger.js").log;

app.use(log());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static('public'));
module.exports=app;
