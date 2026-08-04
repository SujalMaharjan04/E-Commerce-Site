const reviewController = require('./review.controller')
const { tokenExtractor, userExtractor } = require('../../shared/middleware/middleware')
const reviewRouter = require('express').Router()

//Route to get the Review
reviewRouter.get('/:id/review',  reviewController.getById)

//Route to add a Review
reviewRouter.post('/:id/review', tokenExtractor, userExtractor, reviewController.addReview)


module.exports = reviewRouter
