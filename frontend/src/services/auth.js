import api from './api'

const signUp = async(credentials) => {

    const payload = {
        username: credentials.username,
        name: `${credentials.firstName} ${credentials.middleName ? credentials.middleName + ' ' : ""} ${credentials.lastName}`,
        password: credentials.password,
        email: credentials.email,
        address: [
            {
                country: credentials.address.country,
                city: credentials.address.city,
                state: credentials.address.state,
                zip: credentials.address.zip,
                street: credentials.address.street
            }
        ],
        phone: credentials.phoneNumber

    }
    const response = await api.post(`/auth/signup`, payload)
    return response.data
}

const adminLogin = async(credentials) => {
    try {
        const response = await api.post(`/auth/login/admin`, credentials)
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
        const response = await api.post(`/auth/login/user`, credentials)
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

const checkAuth = async() => {
    const response = await api.get("/auth/me")
    return response.data
}

const logout = async() => {
    const response= await api.post("/auth/logout")
    return response.data
}


export default {adminLogin, userLogin, signUp, checkAuth, logout}

