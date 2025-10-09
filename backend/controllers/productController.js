const Product = require('../models/Product')
const {tokenExtractor, userExtractor} = require('../utils/middleware')

const getProduct = async (req, res, next) => {
    try {
        const products = await Product.find({}).populate('brand', 'name').populate('category', 'name')
        res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
}


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('brand', 'name').populate('category', 'name')

        if (!product) {
            return res.status(404).json({error: "Product Not Found!"})
        }
        res.status(200).json(product)
    }
    catch (error) {
        next(error)
    }
}

const getProductByCategory = async (req, res) => {
    try {
        const {category} = req.params
        const products = await Product.find({category}).populate('brand', 'name').populate('category', 'name')

        if (!products) {
            return res.status(404).json({error: 'Product Not Found'})
        }

        return res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
}

const getProductByBrand = async (req, res) => {
    try {
        const {brand} = req.params
        const products = await Product.find({brand}).populate('brand', 'name').populate('category', 'name')

        if (!products) {
            return res.status(404).json({error: 'Product Not Found'})
        }

        return res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {

        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Unauthorized: You can\'t delete accounts'})
        }
        
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({error: 'Product Not Found'})
        }

        return res.status(200).json({message: 'Product deleted successfully'})

    }
    catch (error) {
        next(error)
    }

}

module.exports = {getProduct, getProductById, getProductByCategory, getProductByBrand, deleteProduct}


