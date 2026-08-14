const authController = require('./auth.controller')
const { authLimiter, tokenExtractor, userExtractor } = require('../../shared/middleware/middleware')
const authRouter = require('express').Router()


//Route for signing user
authRouter.post('/signup', authController.signUp)

//Route for logging in user
authRouter.post('/login/user', authController.login)

//Route for loggin in admin
authRouter.post('/login/admin',  authController.login)

//Route to check the token if exists or not
authRouter.get("/me", tokenExtractor, userExtractor, authController.getMe)

//Route to logout and clear the httpOnly cookie token
authRouter.post("/logout", authController.logout)

module.exports = authRouter