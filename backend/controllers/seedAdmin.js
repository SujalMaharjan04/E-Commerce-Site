const User = require('../models/User')
const bcrypt = require('bcrypt')

const createSeedAdmin = async() => {
    try {
        const exisitingAdmin = await User.findOne({role: 'admin'})
        if (exisitingAdmin) return

        const hashedPassword = await bcrypt.hash('admin123', 10)

        await User.deleteOne({username: 'admin'})

        await  User.create({
            username: 'admin',
            name: 'admin',
            email: 'admin@example.com',
            passwordHash: hashedPassword,
            role: 'Admin'
        })
        console.log('Admin created')

    }
    catch(error) {
        console.log('Problem created', error)
    }
}

module.exports = createSeedAdmin