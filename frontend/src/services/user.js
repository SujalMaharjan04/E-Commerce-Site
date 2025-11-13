import axios from 'axios'
import api from './api'



let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

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

export default {setToken, signUp}