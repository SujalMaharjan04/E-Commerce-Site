const Order = require('../models/Order')
const Product = require('../models/Product')

const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find({}).populate('user', 'username, email, phone, address').populate('product', 'name, description, price, category, brand, image, rating')

        if (orders.length === 0) {
            return res.status(404).json({error: 'No Order found'})
        }

        return res.status(200).json(orders)
    }
    catch(error) {
        next(error)
    }
}

const getOneOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'username, email, phone, address').populate('product', 'name, description, price, category, brand, image, rating')

        if (!order) {
            return res.status(404).json({error: "Order not Found"})
        }

        return res.status(200).json(order)
    }
    catch(error) {
        next(error)
    }
}

const addOrder = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({error: "Unauthorized Login"})
        }

        const {items, shippingAddress, paymentMethod} = req.body

        if (!items || Array.isArray(items) || items.length === 0) {
            return res.status(400).json({error: 'Order must include items'})
        }

        const totalAmount = 0
        const validatedItems = []

        for (const item of items) {
            const product = await Product.findById(item.product)

            if (!product) {
                return res.status(404).json({error: 'Product Not Found'})
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({error: 'Insufficient Stock'})
            }

            const itemTotal = item.quantity * item.price
            totalAmount += itemTotal

            validatedItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            })
        }

        const newOrder = new Order({
            user: req.user.id,
            items: validatedItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentStatus: 'pending',
            orderStatus: 'pending'
        })

        const saved = await newOrder.save()

        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: {stock: -item.quantity}
            })
        }

        return res.status(201).json({message: "Order Placed Successfully", order: saved})
    }
    catch(error) {
        next(error)
    }
}

const updateOrder = async(req, res, next) => {
    try {
        const {paymentStatus, orderStatus} = req.body
        const order = await Order.findById(req.params.id).populate('items.product')

        if (!order) {
            return res.status(404).json({error: 'Order Not Found'})
        }

        if (paymentStatus && paymentStatus !== order.paymentStatus) {
            order.paymentStatus = paymentStatus

            if (order.paymentStatus === 'failed') {
                for (const item of order.items) {
                    await Product.findByIdAndUpdate(item.product._id, {
                        $inc: {stock: item.quantity}
                    })
                }

                order.orderStatus = 'cancelled'
            }

            if (order.paymentStatus === 'paid' ) {
                order.orderStatus = 'shipped'
            }
        }

        if (orderStatus && orderStatus !== order.orderStatus) {
            if (orderStatus === 'cancelled' && order.orderStatus !== 'cancelled') {
                for (const item of order.items) {
                    await Product.findByIdAndUpdate(item.product._id, {
                        $inc: {stock: item.quantity}
                    })
                }
            } 
            order.orderStatus = orderStatus
        }

        await order.save()

        return res.status(200).json({message: 'Order Updated Successfully', order})
    }
    catch(error) {
        next(error)
    }
}

const deleteOrder = async(req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)

        if (!order) {
            return res.status(404).json({error: 'Order Not Found'})
        }

        return res.status(203).json({message: 'Order Deleted Successfully'})
    }

    catch(error) {
        next(error)
    }
}


module.exports = {getOrders, getOneOrder, deleteOrder, addOrder, updateOrder}