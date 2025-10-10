const { getcategory, addcategory, updatecategory, deletecategory, getOnecategory } = require('../controllers/categoryController')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

const categoryRouter = require('express').Router()

//Route to get all categorys
categoryRouter.get('/', tokenExtractor, userExtractor, getcategory)

//Route to add category
categoryRouter.post('/', tokenExtractor, userExtractor, addcategory)

//Route to get Single category
categoryRouter.get('/:id', tokenExtractor, userExtractor, getOnecategory)

//Route to update category
categoryRouter.put('/:id', tokenExtractor, userExtractor, updatecategory)

//Route to delete category
categoryRouter.delete('/:id', tokenExtractor, userExtractor, deletecategory)

module.exports = categoryRouter