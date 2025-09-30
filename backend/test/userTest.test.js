const supertest = require('supertest')
const assert = require('node:assert')
const User = require('../models/User')
const app = require('../app')
const mongoose = require('mongoose')
const {beforeEach, after, describe, test, before} = require('node:test')
const helper = require('./testHelper')
const api = supertest(app)

describe('test for User Controller', () => {
    //connecting to db
     before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    //inserting to db
    beforeEach(async() => {
        await User.deleteMany({})
        await User.insertMany(helper.initialUser)
        
    })

    //test to get user info from db
    test ('getting user data from db', async () => {
        const response = await api
                        .get('/api/users')
                        .expect(200)
                        .expect('Content-type', /application\/json/)
        
        
        assert.strictEqual(response.body.length, helper.initialUser.length)
    })

    //test to get user info via id
    test ('getting user data via id i.e. single user', async() => {
        const userAtStart = await helper.usersInDb()
        const userToFind = userAtStart[0]
        const response = await api  
                        .get(`/api/users/${userToFind.id}`)
                        .expect(200)
                        .expect('Content-type', /application\/json/)
        console.log(JSON.stringify(response.body, null, 2))
        assert.strictEqual(response.body, userToFind)
    })
})


//closing db connection
after(async() => {
    await mongoose.connection.close()
})
