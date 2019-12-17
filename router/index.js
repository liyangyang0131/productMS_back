const express = require("express");
const router = express.Router();

router.all('*', function (req, res, next) {
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

//相当于后台的路由，所有的后台处理都需要从这里经过

const login = require("./login");
const logout = require('./logout')
const product = require("./product");

router.use("/login",login);
router.use("/logout",logout);
router.use("/product",product);

module.exports = router;