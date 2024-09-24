const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY
console.log(key)

const generateToken = async(payLoad)=>{
  if (!key) {
    return null
  }
     try {
       const token = jwt.sign(payLoad,key)
       return token
     } catch (error) {
        console.log('error in generating token',error)
        return null        
     }
}

const validateAdmin = async(prev_token) => {
  if (!(prev_token && key)) {
    return false
  }
    try {
     const decodedData = await jwt.verify(prev_token,key)
     //decodedData.role = "user"
     return decodedData.role === "admin" ? true : false
    } catch (error) {
      console.log(error)
      return false
    }
}
module.exports = {generateToken,validateAdmin}