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
    console.log("In listproperty handle request:"+ JSON.stringify(msg));
    console.log("Message: ", msg);
    var address = msg.address;
    var propertyID = msg.propertyID;
    var headline = msg.headline;
    var noofbathrooms = msg.noofbathrooms;
    var noofpeople = msg.noofpeople;
    var noofrooms = msg.noofrooms;
    var propdesc = msg.propdesc;
    var proptype = msg.proptype;
    var enddate = msg.enddate;
    var startdate = msg.startdate;
    var baserate = msg.baserate;
    var cleaningfee = msg.cleaningfee;
    var currency = msg.currency;
    var minstay = msg.minstay;

    console.log(address + ", " + propertyID + ", " + headline + ", " + noofbathrooms + ", " + noofpeople + ", " + noofrooms + ", " + propdesc + ", " + proptype + ", " + enddate + ", " + startdate + ", " + baserate + ", " + cleaningfee + ", " + currency + ", " + minstay);
            
    var queryJson = {
        address: address,
        propertyID: propertyID,
        headline: headline,
        noofbathrooms: noofbathrooms,
        noofpeople: noofpeople,
        noofrooms: noofrooms,
        propdesc: propdesc,
        proptype: proptype,
        enddate: enddate,
        startdate: startdate,
        baserate: baserate,
        cleaningfee: cleaningfee,
        currency: currency,
        minstay: minstay,
        propertyID: 11
    }
    MongoConPool.insertOne('ListProperty',queryJson, function(err,result) {
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