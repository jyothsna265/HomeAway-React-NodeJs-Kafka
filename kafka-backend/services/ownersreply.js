var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoConPool=require("./connection/Mongoconnection");

app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function handle_request(msg, callback){
    var res = {};
    console.log("In OwnersReply handle request:"+ JSON.stringify(msg));

    MongoConPool.updateOne('AskQuestion',{msgID: 2}, { $set: {ownersFirstName: msg.firstName, ownersLastName: msg.lastName, ownersEmailID: msg.emailID, ownersMsg: msg.message, ownersphonenum: msg.phonenum, repliedFlag: "Replied"} }, function(err,result) {
        if(err) {
            console.log("Error in query");
            callback(err,"Error");
        } else if(result){
            console.log("Results:", result);
            callback(null,result);
        }
    })
}

exports.handle_request = handle_request;
