const logger = require('./loggers')

const unknownEndPoint = (req, res) => {
    res.status(404).send({error: 'Unknown Endpoint'})
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name = 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({error: 'expect `username` to be unique'})
    }

    next(err)
}

module.exports = {errorHandler, unknownEndPoint}