const categoryController = require('../controllers/categoryController')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const multer = require('multer')
const upload =multer({dest: 'uploads/'})

const categoryRouter = require('express').Router()

//Route to get all categorys
categoryRouter.get('/',  categoryController.getCategory)

//Route to add category
categoryRouter.post('/', tokenExtractor, userExtractor, upload.single('image'), categoryController.addCategory)

//Route to get Single category
categoryRouter.get('/:id', categoryController.getOneCategory)

//Route to update category
categoryRouter.put('/:id', tokenExtractor, userExtractor, upload.single('image'), categoryController.updateCategory)

//Route to delete category
categoryRouter.delete('/:id', tokenExtractor, userExtractor, categoryController.deleteCategory)

module.exports = categoryRouter