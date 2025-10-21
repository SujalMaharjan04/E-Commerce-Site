const { getBrand, addBrand, updateBrand, deleteBrand, getOneBrand } = require('../controllers/brandControllers')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const multer = require('multer')
const uploads = multer({dest: 'uploads/'})

const brandRouter = require('express').Router()

//Route to get all Brands
brandRouter.get('/',  getBrand)

//Route to add Brand
brandRouter.post('/', tokenExtractor, userExtractor, uploads.single('image'), addBrand)

//Route to get Single brand
brandRouter.get('/:id', tokenExtractor, userExtractor, getOneBrand)

//Route to update Brand
brandRouter.put('/:id', tokenExtractor, userExtractor, uploads.single('image'), updateBrand)

//Route to delete Brand
brandRouter.delete('/:id', tokenExtractor, userExtractor, deleteBrand)

module.exports = brandRouter