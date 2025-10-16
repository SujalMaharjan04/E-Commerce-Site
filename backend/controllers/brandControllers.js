const Brand = require('../models/Brand')

const getBrand = async(req, res, next) => {
    try {
        const brands = await Brand.find({})

        if (brands.length === 0) {
            return res.status(404).json({error: 'No Data to retrieve'})
        }
        console.log(brands)
        return res.status(200).json(brands)
    }
    catch (error) {
        next(error)
    }
}

const getOneBrand = async(req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id)

        if (!brand) {
            return res.status(404).json({error: "No Brand found"})
        }

        return res.status(200).json(brand)
    }
    catch(error) {
        next(error)
    }
}

const addBrand = async(req, res, next) => {
    try {
        const {name, description, logo} = req.body

        const brand = await Brand.findOne({name})

        if (brand) {
            return res.status(401).json({error: "Brand with name already present"})
        }
        const imagePath = req.file ? req.file.path : ''
        const newBrand = new Brand({name, description, logo: imagePath})

        const saved = await newBrand.save()

        return res.status(201).json(saved)
    }
    catch(error) {
        next(error)
    }
}

const deleteBrand = async(req, res, next) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id)
        if (!brand) {
            return res.status(404).json({error: 'Brand not Found'})
        }

        return res.status(203).json({message: 'Brand Deleted'})
    }

    catch(error) {
        next(error)
    }
} 

const updateBrand = async(req, res, next) => {
    try {
        const brands = await Brand.findById(req.params.id)
        const updates = {}

        for (const key in req.body) {
            if (req.body[key] !== brands[key]) {
                updates[key] = req.body[key]
            }
        }

        if (req.file) {
            updates.logo = req.file.path
        } 

        const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, updates, {new: true, runValidators: true})
        return res.status(200).json(updatedBrand)
    }

    catch (error) {
        next(error)
    }
}
module.exports = {getBrand, addBrand, deleteBrand, updateBrand, getOneBrand}