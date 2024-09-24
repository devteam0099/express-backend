const bcrypt = require('bcrypt')

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;
  } catch (error) {
    console.error('Error encrypting password:', error);
    return null;
  }
};

const comparePassword = async(password,hashedPass) => {
  try {
    const matchPassword = await bcrypt.compare(password,hashedPass)
    return matchPassword
  } catch (error) {
    console.log('error in matching password',error)
    return false
  }
}
module.exports = {
  encryptPassword,comparePassword
}