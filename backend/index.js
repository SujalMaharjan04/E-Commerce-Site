const app = require('./app')
const connectDB = require('./db')
const config = require('./shared/utils/config')
const logger = require('./shared/utils/loggers')

const startServer = async() => {
   await connectDB()

   app.listen(config.PORT, () => {
      logger.info(`Server is Running at port ${config.PORT}`)
   })
}

startServer()