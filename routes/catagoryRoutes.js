const express = require('express')
const auth = require('../middlewares/auth.middleware.js')
const validateAdmin = require('../middlewares/adminAuth.middleware.js')
const {createCatagory,obtainCatagories,updateCatagory,deleteCatagory,bulkCatagoryDelete,getSingleCatagory} = require('../controllers/catagory.controler.js')
const catagoryRoute = express.Router()

catagoryRoute.post('/create',auth,validateAdmin,createCatagory)
catagoryRoute.get('/fetchCatagoryList',auth,obtainCatagories)
catagoryRoute.put('/update',auth,validateAdmin,updateCatagory)
catagoryRoute.delete('/delete/:catagory_id?',auth,validateAdmin,deleteCatagory)
catagoryRoute.delete('/bulkDelete',auth,validateAdmin,bulkCatagoryDelete)
catagoryRoute.get('/getsinglecatagroy/:id?',auth,getSingleCatagory)

module.exports = catagoryRoute