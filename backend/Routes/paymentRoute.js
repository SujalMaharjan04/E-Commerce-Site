const paymentRouter = require('express').Router()
const paymentController = require('../controllers/paymentController')
const { tokenExtractor, userExtractor } = require('../utils/middleware')


//Route to initiate Payment
paymentRouter.post('/initiate', tokenExtractor, userExtractor, paymentController.initiatePayment)

//Route to verify Payment
paymentRouter.get('/verify', paymentController.verifyPayment)

//Route to verify Esewa Payment
paymentRouter.get('/verify/esewa', paymentController.verifyEsewa)

module.exports = paymentRouter