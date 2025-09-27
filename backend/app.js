require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/loggers')

const app = express()

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
       logger.info('Connected to the database')
    })
    .catch((error) => {
        logger.error('Error connecting to the database', error.message)
})



module.exports = app