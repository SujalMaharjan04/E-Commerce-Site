const Order = require('../models/Order')

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


module.exports = {getOrders, getOneOrder, deleteOrder}