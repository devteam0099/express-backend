const { response } = require("express")

const auth = (req,res,next) => {
    const {auth_token} = req.headers
       return !auth_token? res.send({code : 401 , data : "Auth_token is required to proceed"}) : next()
}
module.exports = auth