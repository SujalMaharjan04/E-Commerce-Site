const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, Ref: 'Users'},
    items: {
        products: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            Ref: 'Products'
        }
        ],
        quantity: {type: Number, default: 1}
    },
    updatedAt: {type: Date, default: Date.now}

})

cartSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart