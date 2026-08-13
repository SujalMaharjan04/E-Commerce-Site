import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

const adminLogin = async(credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login/admin`, credentials)
        return response.data
    }
    catch (err) {
        
        if (err.response) {
            if (err.response.status === 429) {
                return {
                    success: false,
                    type: 'RATE-LIMIT',
                    message: err.response.data.message,
                    retryAfter: err.response.data.retryAfter
                }
            }
            return {
                success: false,
                type: "ERROR",
                message: err.response.data.message || "LOGIN FAILED"
            }
        }
    }
}


const userLogin = async(credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login/user`, credentials)
        return response.data
    }
    catch (err) {
        if (err.response) {
            
            if (err.response.status === 429) {
                return {
                    success: false,
                    type: 'RATE-LIMIT',
                    message: err.response.data.message,
                    retryAfter: err.response.data.retryAfter
                }
            }
            return {
                success: false,
                type: "ERROR",
                message: err.response.data.message || "LOGIN FAILED"
            }
        }
    }
}


export default {adminLogin, userLogin}

