const User = require('../models/User')

const initialUser = [
    {
        username: 'test1', 
        name: 'test1',
        email: 'test@gmail.com',
        role: 'customer',
        address: [
            {
                street: 'Dhobighat',
                city: 'Lalitpur',
                state: 'Bagmati',
                country: 'Nepal'
            }
        ],
        phone: '9800000000'
    },
    {
        username: 'test2', 
        name: 'test2',
        email: 'test2@gmail.com',
        role: 'customer',
        address: [
            {
                street: 'Dhobighat',
                city: 'Lalitpur',
                state: 'Bagmati',
                country: 'Nepal'
            }
        ],
        phone: '9800000001'
    }
]

const usersInDb = async() => {
    const user = await User.find({})

    return user.map(u => u.toJSON())
}

module.exports = {initialUser, usersInDb}