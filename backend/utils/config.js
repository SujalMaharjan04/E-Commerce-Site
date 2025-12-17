require('dotenv').config()

const PORT = process.env.PORT || 3001

const MONGODB_URL = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL


const SECRET = process.env.SECRET

const SESSION_SECRET = process.env.SESSION_SECRET

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY

const ESEWA_MERCHANT_CODE = process.env.ESEWA_MERCHANT_CODE

module.exports = {PORT, MONGODB_URL, SECRET, SESSION_SECRET, KHALTI_SECRET_KEY, ESEWA_MERCHANT_CODE}