const User = require('../user/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Sign Up
const signUp = async(req, res) => {
    const {username, name, password, email, address, phone} = req.body

    if (!username || !name || !email || !address || !phone) {
        return res.status(400).json({error: 'Field should not be left empty'})
    }
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({username, name, passwordHash, email, address, phone})
    const savedUser = await user.save()

    res.status(201).json({message: 'SignUp Successful', userId: savedUser.id})
}


//Login
const login = async(req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if (!user) return res.status(401).json({error: 'Invalid Username'})
    
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) return res.status(401).json({error: 'Invalid Credentials'})

    if (req.path === '/login/user' && user.role !== 'Customer') {
        return res.status(403).json({error: "You can't Access this"})
    }

    if (req.path === '/login/admin' && user.role !== 'Admin') {
        return res.status(403).json({error: "You can't Access this"})
    }
    
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    }, process.env.SECRET, {expiresIn: '1d'})

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({username: user.username, id: user.id, role: user.role})
}

const getMe = async(req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({error: "User not Found"})
        }

        return res.status(200).json({user})
    }
    catch (err) {
        return res.status(500).json({error: "Server error"})
    }
}

const logout = async(req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    })

    return res.status(200).json({message: 'Logged out'})
}

module.exports = {signUp, login, getMe, logout}