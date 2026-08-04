const authController = require('./auth.controller')
const { authLimiter } = require('../../shared/middleware/middleware')
const authRouter = require('express').Router()


//Route for signing user
authRouter.post('/signup', authController.signUp)

//Route for logging in user
authRouter.post('/login/user', authLimiter, authController.login)

//Route for loggin in admin
authRouter.post('/login/admin', authLimiter, authController.login)

module.exports = authRouter