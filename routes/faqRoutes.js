const express = require('express')
const auth = require('../middlewares/auth.middleware.js')
const validateArray = require('../middlewares/validateArray.js')
const validateId = require('../middlewares/validateId.js')
const {createFaq,deleteFaq,updateFaq,getFaq,bulkFaqDelete,getSingleFaq} = require('../controllers/faq.controller.js')
const faqRoute = express.Router()

faqRoute.post('/create',auth,createFaq)
faqRoute.get('/list',auth,getFaq)
faqRoute.put('/update',auth,updateFaq)
faqRoute.delete('/delete',auth,validateId,deleteFaq)
faqRoute.delete('/bulk-delete',auth,validateArray,bulkFaqDelete)
faqRoute.get('/getsingleFaq',auth,validateId,getSingleFaq)

module.exports = faqRoute