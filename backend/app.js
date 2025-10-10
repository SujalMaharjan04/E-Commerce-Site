const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/loggers')
const userRouter = require('./Routes/userRoute')
const productRouter = require('./Routes/productRoute')
const authRouter = require('./Routes/authRoute')
const brandRouter = require('./Routes/brandRoute')
const orderRouter = require('./Routes/orderRoute')
const categoryRouter = require('./Routes/categoryRoute')
const config = require('./utils/config')
const middleware = require('./utils/middleware')


const app = express()
app.use(express.json())

mongoose
    .connect(config.MONGODB_URL)
    .then(() => {
       logger.info('Connected to the database')
    })
    .catch((error) => {
        logger.error('Error connecting to the database', error.message)
})


app.use('/api/users', userRouter)
// app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/brand', brandRouter)
app.use('/api/order', orderRouter)
app.use('/api/category', categoryRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRoute = require('./Routes/testRoute')
    app.use('/api/testing', testingRoute)
}

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


module.exports = app