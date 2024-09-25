const express = require('express')
const auth = require('../middlewares/auth.middleware.js')
const validateAdmin = require('../middlewares/adminAuth.middleware.js')
const {createFaq,deleteFaq,updateFaq,getFaq,bulkFaqDelete,getSingleFaq} = require('../controllers/faq.controller.js')
const faqRoute = express.Router()

faqRoute.post('/create',auth,validateAdmin,createFaq)
faqRoute.get('/list',auth,getFaq)
faqRoute.put('/update',auth,validateAdmin,updateFaq)
faqRoute.delete('/delete/:id?',auth,validateAdmin,deleteFaq)
faqRoute.delete('/bulk-delete',auth,validateAdmin,bulkFaqDelete)
faqRoute.get('/getsingleFaq/:id?',auth,getSingleFaq)

module.exports = faqRoute