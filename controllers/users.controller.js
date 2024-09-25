const {encryptPassword,comparePassword,generateToken} = require("../utils/authHelper.js");
const User = require("../models/users.model.js");
const message = require('../utils/constants/constants.js')
const {validateFields,successResponse,errorResponse} = require('../utils/validation.js')

const signup = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  if (!(name && username && email && password && role)) {
    const emptyField = validateFields({name,username,email,password,role})
    return res.send(errorResponse(400,emptyField))
  }

  try {
    const existingemail = await User.findOne({where: {email}});
    if (existingemail) {
      return res.send(errorResponse(409,message.USER_EXISTS))
    }
    const hashedPassword = await encryptPassword(password);
    if (!hashedPassword) {
      return res.send(errorResponse(500,message.JWT_ENC_ERROR))
    }
    await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role,
    });
    return res.send(successResponse(201,message.SIGNED_UP))
  } catch (error) {
    console.error(error);
    return res.send(errorResponse(500,message.INTERNAL_ERROR))
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    const emptyField = validateFields({email,password})
    return res.send(errorResponse(400,emptyField))
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const { dataValues } = user;
      const matchedPassword = await comparePassword(password,dataValues.password);
      if (matchedPassword) {
        const token = await generateToken(dataValues);
        return res.cookie("auth_token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
          })
          .send(successResponse(200,message.LOGIN));
      } else {
        return res.send(errorResponse(401,message.INVALID_PASSWORD))
      }
    } else {
      return res.send(errorResponse(404,message.USER_NOT_EXIST))
    }
  } catch (error) {
    return res.send(errorResponse(500,message.INTERNAL_ERROR))
  }
};

module.exports = { signup, login };
