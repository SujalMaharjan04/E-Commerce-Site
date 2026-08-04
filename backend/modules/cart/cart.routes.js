const cartController = require('./cart.controller')
const { tokenExtractor, userExtractor } = require('../../shared/middleware/middleware')
const cartRouter = require('express').Router()

//Route to get All Items in Cart
cartRouter.get('/users', tokenExtractor, userExtractor, cartController.getItems)

//Route to add Items in Cart
cartRouter.post('/users', tokenExtractor, userExtractor, cartController.addItems)

//Route to delete Items in Cart
cartRouter.delete('/users',tokenExtractor, userExtractor, cartController.deleteFromCart)

//Route to Proceed to Order Page
cartRouter.post('/proceed', tokenExtractor, userExtractor, cartController.proceedToOrder)


module.exports = cartRouter