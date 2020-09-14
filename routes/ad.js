const express = require("express");
const router = new express.Router();
const { newAdVerification } = require("../lib/validate");
const {checkSession} = require('../helperFunction/helperFunction')
const ad = require('../schema/ad')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination : function (req,file,cb) {
    cb(null,'./uploads/ads/')
  },
  filename : function (req,file,cb) {
    cb(null,Date.now() + file.originalname)
  }
})
const limits = {
  fileSize : 1024*1024*10
}
const fileFilter = (req,file,cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true)
  } else {
    req.flag = true
    cb(new Error('only jpeg or png format are allowed'),false)
  }
}
var upload = multer({storage,limits,fileFilter})

// router.get("/",checkSession, (req, res) => {
//   res.send("ad");
// });
router.get("/", async (req, res) => {
  let keyword = req.query.keyword ? `.*${req.query.keyword}.*` : '.*.*'
  keyword =  new RegExp(keyword, 'i');
  let location = req.query.location ? `.*${req.query.location}.*` : '.*.*'
  location =  new RegExp(location, 'i');
  // console.log(keyword,location)
  try{
    const options = {
      sort: { _id: -1 },
    };
    const findAd = await ad.find({ $or: [{ "detail.subCategories": keyword },{ 'detail.breed' : keyword},{ 'detail.category' : keyword}],"location":location}).sort({'_id': -1})
    res.send(findAd)
  }catch(e){
    res.send(e)
  }
});

router.post("/new", upload.single('image'), async (req, res) => {
  const data = {
    title : req.body.title,
    des : req.body.des,
    detail : {
      breed : req.body.breed,
      age : req.body.age,
      category : req.body.category,
      subCategories : req.body.subCategories,
    },
    location : req.body.location,
    price : req.body.price,
    imgPath : req.file.path,
    postedBy : req.body.postedBy
  }
  try {
    const tempAd = new ad(data)
    const newAd = await tempAd.save()
    res.status(200).send(newAd)
  }catch(e){
    console.log("error in saving ads", e)
    res.status(400).send("something went wrong, tryagain");
  }
  res.status(200).send("done")
});

module.exports = router;
