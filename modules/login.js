var app = require('../app.js');

app.post('/login',(req,res)=>{
    console.log(req.body);
    res.send('登录成功')
})