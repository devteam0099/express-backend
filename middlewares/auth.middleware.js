const {validateToken,errorResponse} = require('../utils/validation.js')
const message = require('../utils/constants/constants.js')

const auth = async(req,res,next) => {
    const {authorization} = req.headers
    if (!authorization) {
        return res.send(errorResponse(404,message.NO_TOKEN))
    }
    const isValid = await validateToken(authorization)
    return !isValid? res.send(errorResponse(401,message.INVALID_TOKEN)) : next()
}
module.exports = auth