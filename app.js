var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./router/index');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'www')));

//加载模块
app.use("/",index);

app.listen('8000',function(){
    console.log('服务已启动，端口号为8000');
})

