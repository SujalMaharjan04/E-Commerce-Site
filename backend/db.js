const mongoose = require('mongoose')
const config = require("./shared/utils/config")
const logger = require('./shared/utils/loggers')

const connectDB = async() => {
    try {
        await mongoose.connect(config.MONGODB_URL)

        logger.info("Connected to the database")
    }
    catch (error) {
        logger.error("Error connecting to the database", error.message)
        process.exit(1)
    }
}

module.exports = connectDB

