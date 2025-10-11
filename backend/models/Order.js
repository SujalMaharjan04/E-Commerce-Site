const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ],
    totalAmount: Number,
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    paymentMethod: {type: String, enum: ['esewa', 'khalti', 'cod']},
    paymentStatus: {type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'},
    orderStatus: {type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing'},
    createdAt: {type: Date, default: Date.now}
    
})

orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order