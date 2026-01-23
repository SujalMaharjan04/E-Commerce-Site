const  mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    comment: {type: String},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    rating: {type: Number, required: true},
}, {timestamps: true})

reviewSchema.index({product: 1, createdAt: -1}) //Index for fast lookup
reviewSchema.index({product: 1, user: 1}, {unique: true}) //Single review from one person per product 


reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Review = mongoose.model('Review', reviewSchema)

module.exports = Review