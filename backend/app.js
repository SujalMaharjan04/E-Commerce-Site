const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/loggers')
const userRouter = require('./Routes/userRoute')
const productRouter = require('./Routes/productRoute')
const authRouter = require('./Routes/authRoute')
const brandRouter = require('./Routes/brandRoute')
const orderRouter = require('./Routes/orderRoute')
const categoryRouter = require('./Routes/categoryRoute')
const paymentRouter = require('./Routes/paymentRoute')
const newAdmin = require('./controllers/seedAdmin')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const path = require('path')
const newProduct = require('./controllers/seedProduct')
const cartRouter = require('./Routes/cartRoute')


const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(session({
    name: 'sid',
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60
    }
}))

mongoose
    .connect(config.MONGODB_URL)
    .then(async() => {
        logger.info('Connected to the database')
        // await newAdmin()
        // await newProduct()
        
    })
    .catch((error) => {
        logger.error('Error connecting to the database', error.message)
})




app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/brand', brandRouter)
app.use('/api/order', orderRouter)
app.use('/api/category', categoryRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/cart', cartRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRoute = require('./Routes/testRoute')
    app.use('/api/testing', testingRoute)
}





app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


module.exports = app