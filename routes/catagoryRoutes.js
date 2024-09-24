const express = require('express')
const auth = require('../middlewares/auth.middleware.js')
const {createCatagory,obtainCatagories,updateCatagory,deleteCatagory,bulkCatagoryDelete} = require('../controllers/catagory.controler.js')
const catagoryRoute = express.Router()

catagoryRoute.post('/create',auth,createCatagory)
catagoryRoute.get('/fetchCatagoryList',auth,obtainCatagories)
catagoryRoute.put('/update',auth,updateCatagory)
catagoryRoute.delete('/delete/:catagory_id',auth,deleteCatagory)
catagoryRoute.delete('/bulkDelete',auth,bulkCatagoryDelete)

module.exports = catagoryRoute