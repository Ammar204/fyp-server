const express = require("express");
const app = express();
const port = 5000;
const connectMongoose = require("./db").connectMongoose;
var bodyParser = require("body-parser");
//routes
const ad = require("./routes/ad");
const user = require("./routes/user")
connectMongoose();

//middlewear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/ad", ad);
app.use("/user", user);


app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
