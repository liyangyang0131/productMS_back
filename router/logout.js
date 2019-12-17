var express = require('express');
var router = express.Router();

router.post('/',(req,res)=>{
    console.log('退出的用户id:'+req.body.id);
    res.send({
        status:'OK',
        message:'退出成功'
    })
})