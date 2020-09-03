const mongoose = require('mongoose')
const db = require("./dbConf.json")
connectMongoose = () => {
    mongoose.connect(db['url'],
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log("connected to db"))
}



module.exports = {
    connectMongoose
}
