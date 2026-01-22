const reviewController = require('../controllers/reviewController')
const { tokenExtractor, userExtractor } = require('../utils/middleware')
const reviewRouter = require('express').Router()

//Route to get the Review
reviewRouter.get('/:id/review', tokenExtractor, userExtractor, reviewController.getById)

//Route to add a Review
reviewRouter.post('/:id/review', tokenExtractor, userExtractor, reviewController.addReview)


module.exports = reviewRouter
