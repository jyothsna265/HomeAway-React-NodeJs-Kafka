var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');

app.use(bodyParser.json());

var {OwnersSignIn} = require('./models/OwnersSignIn');
//var {mongoose} = require('./db/mongoose');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const client = mongoose.connect('mongodb://localhost:27017/HomeAway', { useNewUrlParser: true });
const url = 'mongodb://localhost:27017/HomeAway';

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
    console.log("In ownerssignin handle request:"+ JSON.stringify(msg));

    MongoClient.connect(url, (err, client) => {
        if(err) {
            console.log("Error connecting to mongo database");
        } else {
            console.log("Connection successful");
            const db = client.db('HomeAway');
            console.log("Message: ", msg);
            var emailID = msg.emailID;
            console.log(emailID);
            db.collection('OwnersSignIn').findOne({
                emailID: emailID
            }, (err, result) => {
                if(err) {
                    console.log("Error in query");
                    callback(err,"Error");
                } else if(result){
                    console.log("Results:", result);
                    callback(null,result);
                }
            })     
        }
    })
}

exports.handle_request = handle_request;