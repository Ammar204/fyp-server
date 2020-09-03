const express = require('express')
const app = express()
const port = 5000
const connectMongoose = require("./db").connectMongoose
connectMongoose()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening at ${port}`)
})