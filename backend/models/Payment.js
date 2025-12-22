const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    method: {type: String, enum: ['esewa', 'khalti', 'cod']},
    transactionId: {type: String, unique: true},
    pidx: {type: String, unique: true},
    amount: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'completed', 'failed'], default: 'pending'},
    dataFormVerficationReq: {type: Object},
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