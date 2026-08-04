const Review = require('./review.model')


// //Returning all Reviews
// const getAll = async(req, res, next) => {
//     try {
//         const reviews = await Review.find({}).populate('product', 'name').populate('user', 'username')
//         res.status(200).json(reviews)
//     }
//     catch (e) {
//         res.status(400).json(e)
//     }
// }

//Returning Review based on ProductId
const getById = async (req, res, next) => {
    try {
        const product = req.params.id
        const review = await Review.find({product}).populate('product', 'name').populate('user', 'username')

        res.status(200).json(review)
    }
    catch (e) {
        res.status(400).json(e)
    }
}

//Posting a Review
const addReview = async(req, res, next) => {
    try {
        const {comment, rating} = req.body
        const product = req.params.id

        const review = await Review.findOne({product, user:req.user.id})
        if (review) {
            return res.status(401).json({error: "Only one review allowed per person"})
        }
        
        if (rating < 1 || rating > 5) {
            return res.status(403).json({error: "Rating should be greater than 1 or less than 5"})
        }

        const newReview = await Review({comment, rating, product, user: req.user.id})
        await newReview.save()
        res.status(200).json({message: "Review Created Succesfully"})

    }
    catch (e)  {
        console.log(e.message)
        res.status(400).json(e)
    }
}

module.exports = { addReview, getById}