const {encryptPassword,comparePassword,} = require("../utils/encryptPassword.js");
const { generateToken } = require("../utils/jwt.js");
const User = require("../models/users.model.js");
const {emptyFieldFinder,successResponse,errorResponse} = require('../utils/constants.js')
const Op = require("sequelize");

const signup = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  if (!(name && username && email && password && role)) {
    const emptyField = emptyFieldFinder({name,username,email,password,role})
    return errorResponse(res,400,`${emptyField} should not be empty`)
  }

  try {
    const existingemail = await User.findOne({
      where: {email,},
    });

    if (existingemail) {
      return errorResponse(res,409,'Email already exists! Try another')
    }
    const hashedPassword = await encryptPassword(password);

    if (!hashedPassword) {
      return errorResponse(res,500,"Password encryption failed. Please try again.")
    }
    try {
      await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        role,
      });

      return successResponse(res,201,'User has been created successfully')
    } catch (error) {
      console.error("Error creating user:", error);
      return errorResponse(res,500,"User could not be registered. Please try again.")
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return errorResponse(res,500,"An internal error occurred. Please try again.")
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    const emptyField = emptyFieldFinder({email,password})
   return errorResponse(res,400,`${emptyField} should not be empty`)
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const { dataValues } = user;
      try {
        const matchedPassword = await comparePassword(
          password,
          dataValues.password
        );
        if (matchedPassword) {
          const token = await generateToken(dataValues);
          res.cookie("auth_token", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: false,
            })
            .send({ code: 200, data: "Login Successful" });
        } else {
          errorResponse(res,401,"Incorrect Password")
        }
      } catch (error) {
        errorResponse(res,500,"an error occured! please try again")
      }
    } else {
      errorResponse(res,404,"user does not exist")
    }
  } catch (error) {
    errorResponse(res,500,"an error occured! please try again")
  }
};

module.exports = { signup, login };
