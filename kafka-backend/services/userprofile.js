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
    console.log("In userProfile handle request:"+ JSON.stringify(msg));
    
    var firstName = msg.firstname;
    var lastName = msg.lastname;
    var aboutMe = msg.aboutme;
    var myCountry = msg.mycountry;
    var company = msg.company;
    var school = msg.school;
    var hometown = msg.hometown;
    var languages = msg.languages;
    var gender = msg.gender;
    var phonenum = msg.phonenum;
    var emailID = msg.emailID;

    console.log(firstName + ", " + lastName + ", " + aboutMe + ", " + myCountry + ", " + company + ", " + school + ", " + hometown + ", " + languages + ", " + gender + ", " + phonenum + ", " + emailID);
            
    var queryJson = {
        firstName: firstName,
        lastName: lastName,
        aboutMe: aboutMe,
        myCountry: myCountry,
        company: company,
        school: school,
        hometown: hometown,
        languages: languages,
        gender: gender,
        phonenum: phonenum,
        emailID: emailID 
    };
            
    MongoConPool.insertOne('UserProfile',queryJson, function(err,result) {
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