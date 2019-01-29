var mongoose =require('mongoose');

var OwnersSignIn= mongoose.model('OwnersSignIn',{
    emailID : {
        type : String
    },
    password :{
        type : String
    }
})

module.exports = {OwnersSignIn};