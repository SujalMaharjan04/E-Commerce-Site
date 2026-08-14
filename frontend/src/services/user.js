import api from './api'

const getUser = async () => {
    const response = await api.get('/users')
    return response.data
}

const update = async (id, newUsers) => {
    const response = await api.put(`/users/${id}`, newUsers)
    return response.data
}

const getUserInfo = async () => {
    const response = await api.get(`/users/profile`)
    return response.data
}


export default { getUser, update, getUserInfo}