const express = require('express')
const auth = require('../middlewares/auth.middleware.js')
const {createFaq,deleteFaq,updateFaq,getFaq,bulkFaqDelete} = require('../controllers/faq.controller.js')
const faqRoute = express.Router()

faqRoute.post('/create',auth,createFaq)
faqRoute.get('/list',auth,getFaq)
faqRoute.put('/update',auth,updateFaq)
faqRoute.delete('/delete',auth,deleteFaq)
faqRoute.delete('/bulk-delete',auth,bulkFaqDelete)

module.exports = faqRoute