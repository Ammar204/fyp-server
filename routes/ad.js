const express = require("express");
const router = new express.Router();
const { newAdVerification } = require("../lib/validate");
const {checkSession} = require('../helperFunction/helperFunction')
const ad = require('../schema/ad')

router.get("/",checkSession, (req, res) => {
  res.send("ad");
});

router.post("/new", async (req, res) => {
  console.log("detail",req.body)
  // const data = {
  //   title : req.body.title,
  //   des : req.body.des,
  //   detail : {
  //     breed : req.body.breed,
  //     age : req.body.age,
  //     category : req.body.category,
  //     subCategories : req.body.subCategories,
  //   },
  //   location : req.body.location,
  //   price : req.body.price
  // }
  // try {
  //   const tempAd = new ad(data)
  //   const newAd = await tempAd.save()
  //   res.send(newAd)
  // }catch(e){
  //   console.log("error in saving ads", e)
  //   res.status(400).send("something went wrong, tryagain");
  // }
  res.send("done")
});

module.exports = router;
