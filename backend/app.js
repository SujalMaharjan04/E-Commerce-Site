require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/loggers')
const userRouter = require('./Routes/userRoute')
const productRouter = require('./Routes/productRoute')

const app = express()
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
       logger.info('Connected to the database')
    })
    .catch((error) => {
        logger.error('Error connecting to the database', error.message)
})


app.use('/users', userRouter)
app.use('/products', productRouter)


module.exports = app