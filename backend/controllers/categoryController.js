const Category = require('../models/Category')

const getCategory = async(req, res, next) => {
    try {
        const categorys = await Category.find({}).populate('product, name, description, price, stock, ratings')

        if (categorys.length === 0) {
            return res.status(404).json({error: 'No Data to retrieve'})
        }

        return res.status(200).json(categorys)
    }
    catch (error) {
        next(error)
    }
}

const getOneCategory = async(req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).json({error: "No Category found"})
        }

        return res.status(200).json(category)
    }
    catch(error) {
        next(error)
    }
}

const addCategory = async(req, res, next) => {
    try {
        const {name, description, logo} = req.body

        const category = await Category.findOne({name})

        if (category.length >= 1) {
            return res.status(401).json({error: "Category with name already present"})
        }

        const newCategory = new Category({name, description, logo})

        const saved = await newCategory.save()

        return res.status(201).json(saved)
    }
    catch(error) {
        next(error)
    }
}

const deleteCategory = async(req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({error: 'Category not Found'})
        }

        return res.status(203).json({message: 'Category Deleted'})
    }

    catch(error) {
        next(error)
    }
} 

const updateCategory = async(req, res, next) => {
    try {
        const categorys = await Category.findById(req.params.id)
        const updates = {}

        for (const key in req.body) {
            if (req.body[key] !== Categorys[key]) {
                updates[key] = req.body[key]
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updates, {new: true, runValidators: true})
        return res.status(200).json(updatedCategory)
    }

    catch (error) {
        next(error)
    }
}
module.exports = {getCategory, addCategory, deleteCategory, updateCategory, getOneCategory}