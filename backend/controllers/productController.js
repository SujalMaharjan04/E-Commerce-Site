const Product = require('../models/Product')

const getProduct = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
}


const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({error: "Product Not Found!"})
    }
    res.status(200).json(product)
}

const getProductByCategory = async (req, res) => {
    const {category} = req.body
    const product = await Product.find({category})

    if (!product) {
        return res.status(404).json({error: 'Product Not Found'})
    }

    return res.status(200).json(product)
}


