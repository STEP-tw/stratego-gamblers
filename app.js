const express = require('express');
const cookieParser =require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.static('public'));
module.exports=app;