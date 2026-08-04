const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: String,
    logo: String,
    description: String
})

brandSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand

