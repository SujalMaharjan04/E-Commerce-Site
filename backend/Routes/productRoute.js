const productRouter = require('express').Router()
const productController = require('../controllers/productController')
const {tokenExtractor, userExtractor} = require('../utils/middleware')

//Route to get all Products
productRouter.get('/', productController.getProduct)

//Route to get individual Product
productRouter.get('/:id', productController.getProductById)

//Route to get Products of same brand
productRouter.get('/brand', productController.getProductByBrand)

//Route to get Products via categories
productRouter.get('/categories', productController.getProductByCategory)

//Route to delete Products
productRouter.delete('/:id', tokenExtractor, userExtractor, productController.deleteProduct)


module.exports = productRouter