const express = require('express')
const auth = require('../middlewares/auth.middleware.js')
const {createCatagory,obtainCatagories,updateCatagory,deleteCatagory,bulkCatagoryDelete,getSingleCatagory} = require('../controllers/catagory.controler.js')
const catagoryRoute = express.Router()

catagoryRoute.post('/create',auth,createCatagory)
catagoryRoute.get('/fetchCatagoryList',auth,obtainCatagories)
catagoryRoute.put('/update',auth,updateCatagory)
catagoryRoute.delete('/delete',auth,deleteCatagory)
catagoryRoute.delete('/bulkDelete',auth,bulkCatagoryDelete)
catagoryRoute.get('/getsinglecatagroy',auth,getSingleCatagory)

module.exports = catagoryRoute