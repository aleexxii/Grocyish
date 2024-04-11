const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema ({
    fname :{
        type : String,
        // required : true
    },
    lname : {
        type : String,
        // required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type :String,
        // required : true,
    },
    status : {
        type : String,
        default : "Unblocked"
    }
})


const User = mongoose.model('User', signUpSchema)

module.exports = User