const express = require("express");
const router = new express.Router();
const { newAdVerification } = require("../lib/validate");

router.get("/", (req, res) => {
  res.send("ad");
});

router.post("/new", async (req, res) => {
  try {
    await newAdVerification.validateAsync(req.body);
  } catch (e) {
    console.log("from /ad/new catch 14 ", e);
    res.send("Error");
  }

  
});

module.exports = router;
