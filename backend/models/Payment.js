const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    order: {type: mongoose.Schema.Types.ObjectId, Ref: 'Order'},
    method: {type: String, enum: ['esewa', 'khalti', 'cod']},
    transactionId: String,
    amount: Number,
    status: {type: String, enum: ['pending', 'completed', 'failed'], default: 'pending'},
    createdAt: {type: Date, default: Date.now}
})

paymentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment