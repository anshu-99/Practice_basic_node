const mongoose  = require('mongoose')

const registerUser = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

var userReg = mongoose.model('userReg',registerUser)
module.exports = userReg