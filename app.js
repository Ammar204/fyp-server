const express = require("express");
const app = express();
const port = 5000;
const connectMongoose = require("./db").connectMongoose;
var bodyParser = require("body-parser");
//routes
const ad = require("./routes/ad");
connectMongoose();

//middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/ad", ad);

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
