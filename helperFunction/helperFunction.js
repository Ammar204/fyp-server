const Session = require('../schema/session')

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

module.exports = {
    checkSession
}