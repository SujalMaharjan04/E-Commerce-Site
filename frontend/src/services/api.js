import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001/api",
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('loggedAppAdmin')
    
    if (token) {
        try {
            const user = JSON.parse(token)
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`
        }}
        catch (error) {
            console.log(error.message)
        }
    }

    return config
})

export default api