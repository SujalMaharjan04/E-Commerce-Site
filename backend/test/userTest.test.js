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
        
        assert.strictEqual(response.body.username, userToFind.username)
    })

    test ('deleting user info ', async () => {
        const userAtStart = await helper.usersInDb()
        const userToDelete = userAtStart[0]
        await api
                .delete(`/api/users/${userToDelete.id}`)
                .expect(200)
        
        const newUser = await helper.usersInDb()
        const username = newUser.map(u => u.username)
        assert(!username.includes(userToDelete.username))
        assert.strictEqual(newUser.length, userAtStart.length - 1 )
    })

    test ('signing up ', async () => {
        const userAtStart = await helper.usersInDb()
        const newUser = {
            username: 'test3',
            name: 'test3',
            password: '12345',
            email: 'test3@gmail.com',
            phone: '9800000003',
            address: [
                {
                    street: 'Imadol',
                    city: 'Lalitpur',
                    state: 'Bagmati',
                    country: 'Nepal'
                }
            ]
        }

        await api  
            .post('/api/auth/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/)
        
        const users = await helper.usersInDb()

        assert.strictEqual(users.length, userAtStart.length + 1)

        const username = users.map(u => u.username)

        assert(username.includes(newUser.username))
    })

    test('logging in', async() => {
        const newUser = {
            username: 'test3',
            name: 'test3',
            password: '12345',
            email: 'test3@gmail.com',
            phone: '9800000003',
            address: [
                {
                    street: 'Imadol',
                    city: 'Lalitpur',
                    state: 'Bagmati',
                    country: 'Nepal'
                }
            ]
        }

        await api  
            .post('/api/auth/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const user = {
            username: 'test3',
            password: '12345'
        }

        const response = await api
                .post('/api/auth/login')
                .send(user)
                .expect(200)
                .expect('Content-type', /application\/json/)

        assert(response.body.token)
        assert.strictEqual(response.body.username, user.username)
    })

    test ('loggin in with wrong credentials', async () => {
        const newUser = {
            username: 'test3',
            name: 'test3',
            password: '12345',
            email: 'test3@gmail.com',
            phone: '9800000003',
            address: [
                {
                    street: 'Imadol',
                    city: 'Lalitpur',
                    state: 'Bagmati',
                    country: 'Nepal'
                }
            ]
        }

        await api  
            .post('/api/auth/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const user = {
            username: 'test3',
            password: '1234'
        }

        await api
            .post('/api/auth/login')
            .send(user)
            .expect(401)
    })

    test ('updating user credentials', async() => {
        const newUser = {
            username: 'test3',
            name: 'test3',
            password: '12345',
            email: 'test3@gmail.com',
            phone: '9800000003',
            address: [
                {
                    street: 'Imadol',
                    city: 'Lalitpur',
                    state: 'Bagmati',
                    country: 'Nepal'
                }
            ]
        }

        await api  
            .post('/api/auth/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const user = {
            username: 'test3',
            password: '12345'
        }

        const response = await api  
                            .post('/api/auth/login')
                            .send(user)
                            .expect(200)
                            .expect('Content-type', /application\/json/)

        const token = response.body.token
        
        const userList = await helper.usersInDb()
        const currUser = userList[2]
        

        const userChange = {
            username: 'test4',
            name: 'test4',
        }

        const result = await api
                        .put(`/api/users/${currUser.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(userChange)
                        .expect(200)
                        .expect('Content-type', /application\/json/)

        assert.strictEqual(result.body.username, 'test4')
        assert.strictEqual(result.body.name, 'test4')
    })
})


//closing db connection
after(async() => {
    await mongoose.connection.close()
})
