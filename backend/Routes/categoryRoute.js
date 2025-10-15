const categoryController = require('../controllers/categoryController')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

const categoryRouter = require('express').Router()

//Route to get all categorys
categoryRouter.get('/',  categoryController.getCategory)

//Route to add category
categoryRouter.post('/', tokenExtractor, userExtractor, categoryController.addCategory)

//Route to get Single category
categoryRouter.get('/:id', categoryController.getOneCategory)

//Route to update category
categoryRouter.put('/:id', tokenExtractor, userExtractor, categoryController.updateCategory)

//Route to delete category
categoryRouter.delete('/:id', tokenExtractor, userExtractor, categoryController.deleteCategory)

module.exports = categoryRouter