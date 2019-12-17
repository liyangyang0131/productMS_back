var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const dburl = 'mongodb://localhost:27017';
const dbName = 'productmanage';

function _connectDB(callback) {
    MongoClient.connect(dburl,function(err,client){
        if(err){
            console.log('连接数据库失败');
            return;
        }
        const db = client.db(dbName);
        // 增、删、改、查操作
        callback(db);
    })
}

exports.ObjectID = ObjectID;

// collectionname 表名
// json 查询条件

// 查询数据
exports.find = function(collectionname,json,callback){
    _connectDB(function(db){
        db.collection(collectionname).find(json).toArray(function(err,data){
            callback(err,data);
        })
    })
}

// 插入数据
exports.insertMany = function(collectionname,arr,callback){
    _connectDB(function(db){
        db.collection(collectionname).insertMany(arr,function(err,data){
            callback(err,data);
        })
    })
}

exports.insertOne = function(collectionname,json,callback){
    _connectDB(function(db){
        db.collection(collectionname).insertOne(json,function(err,data){
            callback(err,data);
        })
    })
}

// 更新数据
exports.updateOne = function(collectionname,originJSON,changeJSON,callback){
    _connectDB(function(db){
        db.collection(collectionname).updateOne(originJSON,{$set:changeJSON},function(err,data){
            callback(err,data);
        })
    })
}

// 删除数据
exports.delete = function(collectionname,json,callback){
    _connectDB(function(db){
        db.collection(collectionname).remove(json,function(err,data){
            callback(err,data);
        })
    })
}
