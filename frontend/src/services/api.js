import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001/api",
})

api.interceptors.request.use((config) => {
    const stored = sessionStorage.getItem('loggedApp')
    
    if (stored) {
        try {
            const parsed = JSON.parse(stored)
            const token = parsed?.state.token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
        }}
        catch (error) {
            console.log(error.message)
        }
    }

    return config
})

export default api