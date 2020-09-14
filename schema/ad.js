const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    imgPath : {
        type : String,
        required : true
    },
    postedBy : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('ad',ad)