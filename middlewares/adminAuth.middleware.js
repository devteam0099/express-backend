const jwt = require('jsonwebtoken')
const {errorResponse} = require('../utils/validation.js')
const message = require('../utils/constants/constants.js')
const key = process.env.SECRET_KEY

const validateAdmin = async(req,res,next) => {
    const {authorization} = req.headers
    if (!(authorization && key)) {
      return !authorization? res.send(errorResponse(400,message.NO_TOKEN)) 
      : res.send(errorResponse(400,message.SECRET_KEY_ERROR))
    }
      try {
       const decodedData = jwt.verify(authorization,key)
       return decodedData.role === "admin" ? next() : res.send(errorResponse(401,message.INVALID_AUTH))
      } catch (error) {
        console.log(error)
        return res.send(errorResponse(500,error.message))
      }
  }
module.exports = validateAdmin  