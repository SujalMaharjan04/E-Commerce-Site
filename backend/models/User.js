const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    passwordHash: String,
    email: {type: String, unique: true, required: true},
    role: {type: String, enum: ['Admin', 'customer'], default: "customer"},
    address: [
        {
            country: String,
            city: String,
            state: String,
            zip: String,
            street: String
        }
    ],
    phone: String,
    createdAt: {type: Date, default: Date.now}
})

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User