const userRouter = require('express').Router()
const userController = require('./user.controller')
const {tokenExtractor, userExtractor} = require('../../shared/middleware/middleware')


//Route for getting all user
userRouter.get('/',  userController.getUser)

//Route for getting the user Info
userRouter.get('/profile', tokenExtractor, userExtractor, userController.getUserInfo)

//Route for getting user by id
userRouter.get('/:id', tokenExtractor, userExtractor, userController.getUserById)

//Route for updating the user
userRouter.put('/:id', tokenExtractor, userExtractor, userController.updateUser)



//Route for deleting the user
userRouter.delete('/:id', tokenExtractor, userExtractor, userController.deleteUser)



module.exports = userRouter

