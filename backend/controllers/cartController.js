const Cart = require('../models/Cart')
const Product = require('../models/Product')

//Controller to Get Cart Items based on Logged In Users
const getItems = async (req, res) => {
    try {
        const cartItems = await Cart.findOne({user: req.user.id})
                                    .populate('user', 'name email')
                                    .populate({path: 'items.product', select: 'image name price', populate: {path: 'image', options: {limit: 1} }})
        
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
        const {productId, quantity, selectedSpecs} = req.body

        if (!productId || !quantity) return res.status(400).json({error: "Product Id and Quantity are required"})

        const product = await Product.findById(productId)

        if (!product) return res.status(404).json({error: "Product Not Found"})

        if (product.stock < quantity) return res.status(400).json({error: "Not enough stock available"})

        let cart = await Cart.findOne({user: req.user.id})

        if (!cart) {
            cart = new Cart({user: req.user.id, items: []})
        }

        //Checking if product and specs already exists
        const existingItemIndex = cart.items.findIndex(
            item => 
                item.product.toString() === productId && JSON.stringify(item.selectedSpecs) === JSON.stringify(selectedSpecs)
        )
        
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity
        } else {
            cart.items.push({product: productId, quantity, selectedSpecs})
        }
        
        const savedItem = await cart.save()
        return res.status(200).json(savedItem)
    }

    catch (error) {
        res.status(500).json({error: error.message})
    }
}


//Controller for Deleting the cart item
const deleteFromCart = async(req, res) => {
    try {
        const {productId} = req.body

        const cartItem = await Cart.findOneAndUpdate(
            {user: req.user.id},
            {$pull: {items: {product: productId}}},
            { new: true}
        )

        if (!cartItem) {
            return res.status(404).json({error: "Item Not Found"})
        }

        return res.status(200).json(cartItem)
    }

    catch (error) {
        console.log(error)
    }
}

module.exports = {getItems, addItems, deleteFromCart}