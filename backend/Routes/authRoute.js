const authController = require('../controllers/authController')
const authRouter = require('express').Router()


//Route for signing user
authRouter.post('/signup', authController.signUp)

//Route for logging in user
authRouter.post('/login/user', authController.login)

//Route for loggin in admin
authRouter.post('/login/admin', authController.login)

module.exports = authRouter