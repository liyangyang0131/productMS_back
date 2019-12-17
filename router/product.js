const express = require("express");
const router = express.Router();
var DB = require('../modules/db');

router.get('/list', (req, res) => {
    DB.find('product', {}, function (err, data) {
        if (err) throw err;
        let result = [];
        data.map(item=>{
            item.id = item['_id']
            delete item['_id']
        })
        res.send({
            message: '',
            list: data,
        })
    })
})

router.delete('/delete',(req,res)=>{
    console.log('删除商品id：'+req.query.id);
    const params = {_id:new DB.ObjectID(req.query.id)};
    DB.delete('product',params,function(err,data){
        if (err) throw err;
        res.send({
            message: '删除商品成功！',
            status:'OK'
        })
    })
})

router.post('/add',(req,res)=>{
    console.log('添加商品内容：',req.body);
    DB.insertOne('product',req.body,function(err,data){
        if (err) throw err;
        res.send({
            message: '添加商品成功！',
            status:'OK'
        })
    })
})

router.put('/edit',(req,res)=>{
    console.log(req.body);
    const id = req.body.id;
    delete(req.body.id)
    DB.updateOne('product',{_id:new DB.ObjectID(id)},req.body,function(err,data){
        if (err) throw err;
        res.send({
            message: '修改商品成功！',
            status:'OK'
        })
    })
})

module.exports = router;