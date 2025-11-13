import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

const adminLogin = async(credentials) => {
    const response = await axios.post(`${API_URL}/auth/login/admin`, credentials)
    return response.data
}


const userLogin = async(credentials) => {
    const response = await axios.post(`${API_URL}/auth/login/user`, credentials)
    return response.data
}


export default {adminLogin, userLogin}

