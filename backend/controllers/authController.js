const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Sign Up
const signUp = async(request, response) => {
    const {username, name, password, email, address, phone} = request.body
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({username, name, passwordHash, email, address, phone})
    const savedUser = await user.save()

    response.status(201).json({message: 'SignUp Successful', userId: savedUser.id})
}


//Login
const login = async(req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if (!user) return res.status(401).json({error: 'Invalid Username'})
    
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) return res.status(401).json({error: 'Invalid Credentials'})
    
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.SECRET, {expiresIn: '1d'})

    res.status(200).json({token, username: user.username, id: user.id})
}

module.exports = {signUp, login}