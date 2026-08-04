const Product = require('./product.model')

//Function to Get All Product
const getProduct = async (req, res, next) => {
    try {
        const products = await Product.find({}).populate('brand', 'name').populate('category', 'name')
        res.status(200).json(products)
    }
    catch (error) {
        next(error)
    }
}

const getProductUsingCursor = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10
        const cursor = req.query.cursor
        const category = req.query.category

        let query = {}

        if (category) {
            query.category = category
        }

        if (cursor) {
            query._id = {$lt: JSON.parse(cursor)}
        }

        const products = await Product.find(query).sort({_id: -1}).limit(limit + 1)
        let hasNextPage = false
        let nextCursor = null

        if (products.length > limit) {
            hasNextPage = true
            const lastProduct = products.pop()
            nextCursor = lastProduct.id
        }
        res.json({
            products,
            nextCursor,
            hasNextPage
        })
    }
    catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

//Function to Get Individual Product
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


//Function to Get Product By Category
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

//Function to Get Product By Brand
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

//Function to Add Product By Admin Only
const addProduct = async (req, res, next) => {

    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({error: "Unauthorized: You can't add products"})
        }

        const {name, description, price, stock, category, brand, specs} = req.body
        const changedSpecs = JSON.parse(specs)
        
        if (!name || !price) {
            return res.status(400).json({error: "Name and Price should be given"})
        }

        //Changing the file path to use localhost:3001/uploads/image
        const filePath = req.file ? req.file.path.replace(/\\/g, '/') : ''
        const image = `${req.protocol}://${req.get('host')}/${filePath}`

        const newProduct =  new Product({name, description, price, stock, category, brand, image, specs: changedSpecs})
        const savedProduct = await newProduct.save()
        return res.status(200).json(savedProduct)
    }
    catch (error) {
        next(error)
    }
}

//Function to Update Product By Admin Only
const updateProduct = async (req, res, next) => {
    console.log(req.params.id, req.body)
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({error: "Unauthorized: You can't updates products"})
        }

        const product = await Product.findById(req.params.id)
        const updates = {}

        //Checking what changes have been made
        for (const key in req.body) {
            if (req.body[key] !== product[key]) {
                updates[key] = req.body[key]
            }
        }

        //Changing the file path in the form of localhost:3001/uploads/Image
        if (req.file) {
            updates.image = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`
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


//Function to Delete Product By Admin Only
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



module.exports = {getProduct, getProductById, getProductByCategory, getProductByBrand, deleteProduct, addProduct, updateProduct, getProductUsingCursor}


