const express = require('express');
const router = new express.Router();
const { newUserVerification } = require("../lib/validate");
const user = require('../schema/user')
const session = require('../schema/session')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const { login, pass } = req.body
    let findUser = null
    console.log(login)
    try {
        findUser = await user.findOne({ $or: [{ email: login }, { username: login }] })
        if (!findUser) return res.status(401).send("username and password does not match")
        const validPassword = await bcrypt.compare(req.body.password, findUser.password)
        if (!validPassword) return res.status(401).send("username and password does not match")
    } catch (e) {
        console.log("error in find user", e)
        res.status(400).send("something went wrong, tryagain");
    }

    // produce token
    const token = jwt.sign({ _id: findUser._id }, "ss")

    //save session token into DB
    const userSession = new session({
        tokenDB: token
    });
    try {
        const savedtoken = await userSession.save()
        res.status(200).send({ token })

    } catch (err) {
        res.status(406).send("token failed")
    }
})
router.post('/new', async (req, res) => {
    try {
        await newUserVerification.validateAsync(req.body);
    } catch (e) {
        res.status(400).send("something is missing");
    }
    req.body.pass != req.body.repass ? res.send("pass doesn`t match") : null
    try {
        const duplicatedEmail = await user.findOne({ email: req.body.email })
        const duplicateUsername = await user.findOne({ username: req.body.username })
        if (duplicatedEmail || duplicateUsername) return res.status(400).send("email/username already exist")
    } catch (e) {
        console.log("error in checking duplicating ail and password", e)
        res.status(400).send("something went wrong, tryagain");
    }
    try {
        const salt = await bcrypt.genSalt(4)
        const hashedPass = await bcrypt.hash(req.body.pass, salt)
        const tempUser = new user({
            username: req.body.username,
            password: hashedPass,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        });
        const savedUser = await tempUser.save()
        res.send(savedUser)
    } catch (e) {
        console.log("error in creating hash and saving user", e)
        res.status(400).send("something went wrong, tryagain");
    }
})




module.exports = router;
