const mongoose = require('mongoose')

const userSession = new mongoose.Schema({
    tokenDB : {
        type : String,
        required : true 
    }
})

module.exports = mongoose.model('userSession',userSession)