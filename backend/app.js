const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./shared/utils/loggers')
const userRouter = require('./modules/user/user.routes')
const productRouter = require('./modules/product/product.routes')
const authRouter = require('./modules/auth/auth.routes')
const brandRouter = require('./modules/brand/brand.route')
const orderRouter = require('./modules/order/order.routes')
const categoryRouter = require('./modules/category/category.routes')
const paymentRouter = require('./modules/payment/payment.routes')
const newAdmin = require('./seeds/seedAdmin')
const config = require('./shared/utils/config')
const middleware = require('./shared/middleware/middleware')
const path = require('path')
const newProduct = require('./seeds/seedProduct')
const cartRouter = require('./modules/cart/cart.routes')
const reviewRouter = require('./modules/review/review.routes')
const cookieParser = require('cookie-parser')



const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://e-commerce-site-lyart-nine.vercel.app/',
    credentials: true
}))
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use(session({
//     name: 'sid',
//     secret: config.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'lax',
//         maxAge: 1000 * 60 * 60
//     }
// }))




app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/brand', brandRouter)
app.use('/api/order', orderRouter)
app.use('/api/category', categoryRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/cart', cartRouter)
app.use('/api/products', reviewRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRoute = require('./Routes/testRoute')
    app.use('/api/testing', testingRoute)
}





app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


module.exports = app