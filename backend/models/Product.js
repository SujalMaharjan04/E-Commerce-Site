const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    image: [String],
    ratings: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
})


productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product