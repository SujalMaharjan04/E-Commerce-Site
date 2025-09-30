const userRouter = require('express').Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

//Route for getting all user
userRouter.get('/', userController.getUser)

//Route for getting user by id
userRouter.get('/', userController.getUserById)

//Route for updating the user
userRouter.post('/', userController.updateUser)


//Route for deleting the user
userRouter.delete('/', userController.deleteUser)

//Route for signing user
userRouter.post('/', authController.signUp)

//Route for logging in user
userRouter.post('/', authController.login)

module.exports = userRouter

