const Product = require('../models/Product')


const getProduct = async (req, res, next) => {
    try {
        const products = await Product.find({}).populate('brand', 'name').populate('category', 'name')
        res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
}


const getProductById = async (req, res, next) => {
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

const getProductByCategory = async (req, res, next) => {
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

const getProductByBrand = async (req, res, next) => {
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

const addProduct = async (req, res, next) => {

    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({error: "Unauthorized: You can't add products"})
        }

        const {name, description, price, stock, category, brand, ratings, specs} = req.body

        if (!name || !price) {
            return res.status(400).json({error: "Name and Price should be given"})
        }

        const image = req.file ? req.file.path : ''

        const newProduct =  new Product({name, description, price, stock, category, brand, image, ratings, specs})
        const savedProduct = await newProduct.save()
        return res.status(200).json(savedProduct)
    }
    catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    console.log(req.params.id, req.body)
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({error: "Unauthorized: You can't updates products"})
        }

        const product = await Product.findById(req.params.id)
        const updates = {}

        for (const key in req.body) {
            if (req.body[key] !== product[key]) {
                updates[key] = req.body[key]
            }
        }

        if (req.file) {
            updates.image = req.file.path
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        })

        return res.status(201).json(updatedProduct)
    }
    catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {

        if (req.user.role !== 'Admin') {
            return res.status(403).json({error: "Unauthorized: You can't delete accounts"})
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

module.exports = {getProduct, getProductById, getProductByCategory, getProductByBrand, deleteProduct, addProduct, updateProduct}


