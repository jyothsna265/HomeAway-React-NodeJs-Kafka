var connection =  new require('./kafka/Connection');

//topics files
var travelerinbox = require('./services/travelerinbox.js');
var traveleroutbox = require('./services/traveleroutbox.js');
var userprofile = require('./services/userprofile.js');
var travelerdashboard = require('./services/travelerdashboard.js');
var listproperty = require('./services/listproperty.js');
var detailsview = require('./services/detailsview.js');
var ownersdashboardbooked = require('./services/ownersdashboardbooked.js');
var ownersdashboardall= require('./services/ownersdashboardall.js');
var ownersinbox = require('./services/ownersinbox.js');
var ownersoutbox = require('./services/ownersoutbox.js');
var ownersreply = require('./services/ownersreply.js');
var askquestion = require('./services/askquestion.js');

console.log('server is running');
var producer = connection.getProducer();

var consumer_userprofile_topic = connection.getConsumer('userprofile1');
consumer_userprofile_topic.on('message', function (message) {
    console.log('message received in consumer_userprofile_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    userprofile.handle_request(data.data, function(err,res){
        console.log('after handle in userprofile_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_listproperty_topic = connection.getConsumer('listproperty');
consumer_listproperty_topic.on('message', function (message) {
    console.log('message received in consumer_listproperty_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    listproperty.handle_request(data.data, function(err,res){
        console.log('after handle in listproperty_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_detailsview_topic = connection.getConsumer('detailsview');
consumer_detailsview_topic.on('message', function (message) {
    console.log('message received in consumer_detailsview_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    detailsview.handle_request(data.data, function(err,res){
        console.log('after handle in detailsview_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_travelerdashboard_topic = connection.getConsumer('travelerdashboard');
consumer_travelerdashboard_topic.on('message', function (message) {
    console.log('message received in consumer_travelerdashboard_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    travelerdashboard.handle_request(data.data, function(err,res){
        console.log('after handle in consumer_travelerdashboard_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_ownersdashboardbooked_topic = connection.getConsumer('ownersdashboardbooked');
consumer_ownersdashboardbooked_topic.on('message', function (message) {
    console.log('message received in consumer_ownersdashboardbooked_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    ownersdashboardbooked.handle_request(data.data, function(err,res){
        console.log('after handle in consumer_ownersdashboardbooked_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_ownersdashboardall_topic = connection.getConsumer('ownersdashboardall');
consumer_ownersdashboardall_topic.on('message', function (message) {
    console.log('message received in consumer_ownersdashboardall_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    ownersdashboardall.handle_request(data.data, function(err,res){
        console.log('after handle in consumer_ownersdashboardall_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_travelerinbox_topic = connection.getConsumer('travelerinbox');
consumer_travelerinbox_topic.on('message', function (message) {
    console.log('message received in consumer_travelerdashboard_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    travelerinbox.handle_request(data.data, function(err,res){
        console.log('after handle in consumer_travelerinbox_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_traveleroutbox_topic = connection.getConsumer('traveleroutbox');
consumer_traveleroutbox_topic.on('message', function (message) {
    console.log('message received in consumer_traveleroutbox_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    traveleroutbox.handle_request(data.data, function(err,res){
        console.log('after handle in consumer_traveleroutbox_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_ownersinbox_topic = connection.getConsumer('ownersinbox');
consumer_ownersinbox_topic.on('message', function (message) {
    console.log('message received in consumer_ownersinbox_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    ownersinbox.handle_request(data.data, function(err,res){
        console.log('after handle in consumer_ownersinbox_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_ownersoutbox_topic = connection.getConsumer('ownersoutbox');
consumer_ownersoutbox_topic.on('message', function (message) {
    console.log('message received in consumer_ownersoutbox_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    ownersoutbox.handle_request(data.data, function(err,res){
        console.log('after handle in consumer_ownersoutbox_topic server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_ownersreply_topic = connection.getConsumer('ownersreply');
consumer_ownersreply_topic.on('message', function (message) {
    console.log('message received in consumer_ownersreply_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    ownersreply.handle_request(data.data, function(err,res){
        console.log('after handle in signin_ownersreply server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var consumer_askquestion_topic = connection.getConsumer('askquestion');
consumer_askquestion_topic.on('message', function (message) {
    console.log('message received in consumer_askquestion_topic - server.js');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("Data: ", data);
    askquestion.handle_request(data.data, function(err,res){
        console.log('after handle in askquestion server.js '+ res.value);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


