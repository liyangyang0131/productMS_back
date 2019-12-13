var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var DB = require('./modules/db');


var app = express();

// view engine setup

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'www')));

/*app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'www')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.all('*', function (req, res, next) {
    // 设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin', '*');
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Content-Type','text/json; charset=utf-8');

    if (req.method.toLowerCase() == 'options') {
        res.send(200);  // 让options尝试请求快速结束
    } else {
        next();
    }
});

app.listen('8000',function(){
    console.log('服务已启动，端口号为8000');
})


app.post('/login',(req,res)=>{
    DB.find('user', req.body, function (error, data) {
        if (error) throw error;
        let str;
        if(data.length){
            str = {
                status:'OK',
                message:'登录成功',
                data:{
                    id:data[0]._id,
                    username:data[0].username
                }
            }
        }else{
            str = {
                status:'FAILED',
                message:'用户名密码不匹配'
            }
        }
        res.send(str);
    })
})

app.post('/logout',(req,res)=>{
    console.log('退出的用户id:'+req.body.id);
    res.send({
        status:'OK',
        message:'退出成功'
    })
})

app.get('/productList', (req, res) => {
    DB.find('product', {}, function (err, data) {
        if (err) throw err;
        res.send({
            message: '',
            list: data,
        })
    })
})

app.delete('/productDelete',(req,res)=>{
    DB.delete('product',req.body,function(err,data){
        if (err) throw err;
        res.send({
            message: '删除商品成功！',
            status:'OK'
        })
    })
})

// modules.exports = app;
