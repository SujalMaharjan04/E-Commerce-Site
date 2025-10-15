import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

const login = async(credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials)
    return response.data
}

export default {login}

