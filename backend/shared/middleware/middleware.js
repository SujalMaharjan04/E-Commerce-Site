const logger = require('../utils/loggers')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const limit = require('express-rate-limit')
// const redisClient = require('../redisClient')
const {RedisStore} = require('rate-limit-redis')

const unknownEndPoint = (req, res) => {
    res.status(404).json({error: 'Unknown Endpoint'})
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({error: 'expect `username` to be unique'})
    }

    console.log(err.message)
    res.status(500).json({error: err.message})

}

const tokenExtractor = (req, res, next) => {
    req.token = req.cookies.token || null
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

const authLimiter = limit.rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    // store: new RedisStore({
    //     sendCommand: (...args) => redisClient.sendCommand(args)
    // }),
    handler: (req, res) => {
        const retryAfter = Number(res.getHeader("Retry-After")) || null

        res.status(429).json({
            message: "Too many requests, Please try again in",
            retryAfter: Number(retryAfter)
        })
    }
})

const publicLimiter = limit.rateLimit({
    windowMs: 1 * 60 * 60 * 1000,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
})


const checkSessionForCheckout = (req, res, next) => {
    if (!req.session.canPlaceOrder) {
        return res.status(403).json({error: "Invalid Session"})
    }

    next()
}

module.exports = {errorHandler, unknownEndPoint, userExtractor, tokenExtractor, checkSessionForCheckout, authLimiter, publicLimiter}