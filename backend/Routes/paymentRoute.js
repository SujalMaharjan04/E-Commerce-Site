const paymentRouter = require('express').Router()
const paymentController = require('../controllers/paymentController')
const { tokenExtractor, userExtractor } = require('../utils/middleware')


//Route to initiate Payment
paymentRouter.post('/initiate', tokenExtractor, userExtractor, paymentController.initiatePayment)

//Route to verify Payment
paymentRouter.get('/verify', tokenExtractor, userExtractor, paymentController.verifyPayment)

module.exports = paymentRouter