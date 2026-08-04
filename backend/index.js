const app = require('./app')
const config = require('./shared/utils/config')
const logger = require('./shared/utils/loggers')

app.listen(config.PORT, () => {
   logger.info(`Server is Running at port ${config.PORT}` )
})