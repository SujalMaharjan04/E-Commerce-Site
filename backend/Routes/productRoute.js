const productRouter = require('express').Router()
const productController = require('../controllers/productController')
const {tokenExtractor, userExtractor} = require('../utils/middleware')
const multer = require('multer')
const uploads = multer({dest: 'uploads/products/'})

//Route to get all Products
productRouter.get('/', productController.getProduct)

//Route to add individual Product
productRouter.post('/', tokenExtractor, userExtractor, uploads.single('image'), productController.addProduct)

//Route to get Products of same brand
productRouter.get('/brand/:brand', productController.getProductByBrand)

//Route to get Products via categories
productRouter.get('/categories/:category', productController.getProductByCategory)

//Route to get individual Product
productRouter.get('/:id', productController.getProductById)



//Route to update product
productRouter.put('/:id', tokenExtractor, userExtractor, uploads.single('image'), productController.updateProduct)

//Route to delete Products
productRouter.delete('/:id', tokenExtractor, userExtractor, productController.deleteProduct)


module.exports = productRouter