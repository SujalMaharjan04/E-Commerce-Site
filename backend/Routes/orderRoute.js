const { tokenExtractor, userExtractor } = require('../utils/middleware')
const orderController = require('../controllers/orderController')
const orderRouter = require('express').Router()

//Route to Get all Order
orderRouter.get('/', tokenExtractor, userExtractor, orderController.getOrders)

//Route to get Single Order
orderRouter.get('/:id', tokenExtractor, userExtractor, orderController.getOneOrder)

//Route to get Delete Order
orderRouter.delete('/:id', tokenExtractor, userExtractor, orderController.deleteOrder)

module.exports = orderRouter