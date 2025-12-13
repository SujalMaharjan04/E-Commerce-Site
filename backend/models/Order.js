const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number, required: true},
            specs: {type: Object, default: {}, required: true},
            price: {type: Number, required: true}
        }
    ],
    totalAmount: Number,
    shippingAddress: String,
    deliveryMethod: {type: String, enum: ['Fast', 'Standard']},
    paymentMethod: {type: String, enum: ['Esewa', 'Khalti', 'COD']},
    paymentStatus: {type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'},
    confirmed: {type: Boolean, default: false},
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