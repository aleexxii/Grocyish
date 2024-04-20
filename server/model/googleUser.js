const mongoose = require('mongoose')

const googleUserSchema = new mongoose.Schema({
    googleId: String,
    name : String,
    email : String,
    gender : String,
    birthday : Date
})

const googleUser = mongoose.model('googleUser',googleUserSchema)
module.exports = googleUser