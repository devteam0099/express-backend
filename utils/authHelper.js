const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const comparePassword = async(password,hashedPass) => {
  try {
    const matchPassword = await bcrypt.compare(password,hashedPass)
    return matchPassword
  } catch (error) {
    console.log(error)
    return false
  }
}

const generateToken = async(payLoad)=>{
  if (!key) {
    return null
  }
     try {
       const token = jwt.sign(payLoad,key)
       return token
     } catch (error) {
        console.log(error)
        return null        
     }
}

module.exports = {encryptPassword,comparePassword,generateToken}