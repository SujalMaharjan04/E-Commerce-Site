const logger = require('./loggers')

const unknownEndPoint = (req, res) => {
    res.status(404).json({error: 'Unknown Endpoint'})
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({error: 'expect `username` to be unique'})
    }

    res.status(500).json({error: 'Error Connecting to Database'})

}

module.exports = {errorHandler, unknownEndPoint}