const cartController = require('../controllers/cartController')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const cartRouter = require('express').Router()

//Route to get All Items in Cart
cartRouter.get('/users', tokenExtractor, userExtractor, cartController.getItems)

//Route to add Items in Cart
cartRouter.post('/users', tokenExtractor, userExtractor, cartController.addItems)


module.exports = cartRouter