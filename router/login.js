const express = require("express");
const router = express.Router();
var DB = require('../modules/db');

router.post('/',(req,res)=>{
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

module.exports = router;