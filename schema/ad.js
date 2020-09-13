const mongoose = require('mongoose')

const ad = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    des : {
        type : String,
        required : true
    },
    detail : {
        type : Object,
        required : true
    },
    price : {
        type : String,
        required : true 
    },
    location : {
        type : String,
        required : true
    },

})

module.exports = mongoose.model('ad',ad)