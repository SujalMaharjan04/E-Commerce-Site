const Cart = require('../models/Cart')
const Product = require('../models/Product')

//Controller to Get Cart Items based on Logged In Users
const getItems = async (req, res) => {
    try {
        const cartItems = await Cart.findOne({user: req.user.id}).populate('user', 'name email').populate('items.products', 'name price')
        
        if (!cartItems) {
            return res.status(404).json({items: []})
        }

        res.status(200).json(cartItems)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Controller to Put Items in the Cart
const addItems = async (req, res) => {
    try {
        const {productId, quantity} = req.body

        if (!productId || !quantity) return res.status(400).json({error: "Product Id and Quantity are required"})

        const product = await Product.findById(productId)

        if (!product) return res.status(404).json({error: "Product Not Found"})

        if (product.stock < quantity) return res.status(400).json({error: "Not enough stock available"})
        
        const newItem = new Cart({
            user: req.user.id,
            items: {
                products: productId,
                quantity: quantity
            }

        })
        const savedItem = await newItem.save()
        return res.status(200).json(savedItem)
    }

    catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {getItems, addItems}