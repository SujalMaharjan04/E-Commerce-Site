const logger = require('./loggers')
const jwt = require('jsonwebtoken')
const config = require('./config')

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

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.includes('Bearer ')) {
        req.token =  authorization.substring(7)
    } else {
        req.token = null
    }
    next()
}

const userExtractor = (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, config.SECRET)

        if (!decodedToken.id) {
            return res.status(401).json({error: "Token invalid or missing!"})
        }
        
        req.user = decodedToken
        next()
    }
    catch (error) {
        return res.status(401).json({error: 'Token invalid!'})
    }
}

const checkSessionForCheckout = (req, res, next) => {
    if (!req.session.canPlaceOrder) {
        return res.status(403).json({error: "Invalid Session"})
    }

    delete req.session.canPlaceOrder

    next()
}

module.exports = {errorHandler, unknownEndPoint, userExtractor, tokenExtractor, checkSessionForCheckout}