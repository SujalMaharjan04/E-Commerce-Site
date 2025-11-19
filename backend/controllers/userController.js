
const User = require('../models/User')

const getUser = async(req, res) => {
    const users = await User.find({})

    return res.status(200).json(users)
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({error: 'No User Found'})
        res.status(200).json(user)
    }
    catch(error) {
        res.status(400).json({error: 'Unknown Error'})
    }
}



const updateUser = async (req, res) => {
    try {
        
        if (req.user.role !== 'Admin') {
            return res.status(401).json({error: "Unauthorized: cannot modify another user"})
        }
        
        // const user = await User.findById(req.params.id)
        // const updates = {}

        // for (const key in user) {
        //     if (req.body[key] !== undefined && req.body[key] !== user[key])
        //         updates[key] = req.body[key]
        // }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        return res.status(201).json(updatedUser)
    }
    catch(error) {
        res.status(400).json({error: 'Unknown Error'})
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({error: 'No user Found'})
        
        res.status(200).json({message: 'User Deleted Successfully'})
    }
    catch (error) {
        res.status(400).json({error: 'Delete Failed'})
    }
}

module.exports = {
    getUser, 
    getUserById, 
    updateUser,
    deleteUser
}