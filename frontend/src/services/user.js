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

const getUser = async () => {
    const response = await api.get('/users')
    return response.data
}

const update = async (id, newUsers) => {
    const response = await api.put(`/users/${id}`, newUsers)
    return response.data
}

const getUserAddress = async () => {
    const response = await api.get(`/users/profile`)
    return response.data
}


export default {setToken, signUp, getUser, update, getUserAddress}