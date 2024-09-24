const express = require('express')
const {signup,login} = require('../controllers/users.controller.js')

const userRoute = express.Router()
userRoute.post('/signup',signup)
userRoute.post('/login',login)

module.exports = userRoute