const express = require('express')
const auth = require('../middlewares/auth.middleware.js')
const validateId = require('../middlewares/validateId.js')
const validateArray = require('../middlewares/validateArray.js')
const {createCatagory,obtainCatagories,updateCatagory,deleteCatagory,bulkCatagoryDelete,getSingleCatagory} = require('../controllers/catagory.controler.js')
const catagoryRoute = express.Router()

catagoryRoute.post('/create',auth,createCatagory)
catagoryRoute.get('/fetchCatagoryList',auth,obtainCatagories)
catagoryRoute.put('/update',auth,validateId,updateCatagory)
catagoryRoute.delete('/delete',auth,validateId,deleteCatagory)
catagoryRoute.delete('/bulkDelete',auth,validateArray,bulkCatagoryDelete)
catagoryRoute.get('/getsinglecatagroy',auth,validateId,getSingleCatagory)

module.exports = catagoryRoute