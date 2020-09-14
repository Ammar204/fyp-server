const Session = require('../schema/session')
const jwt = require('jsonwebtoken')

const checkSession = async (req,res,next) => {
    let token = req.header('Authorization')
    if(!token){
        res.status(403).send(false)
    }
    token = token.replace('basic ', "")
    const flag = await Session.find({tokenDB:token})
    if(flag.length == 0){
        res.status(403).send(false)
    }
    next()
}
const getRequesterId = req => {
    const token = req.header('Authorization').replace('basic ', "")
    const decodedJwt = jwt.decode(token, { complete: true });
    const id =  decodedJwt.payload['_id']
    return id
}

module.exports = {
    checkSession,
    getRequesterId
}