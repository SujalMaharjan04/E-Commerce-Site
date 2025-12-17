import api from './api'

const getAllOrder = async () => {
    const response = await api.get('/order')
    return response.data
}

const getOrderById = async (id) => {
    const response = await api.get(`/order/${id}`)
    return response.data
}

const addOrder = async(order) => {
    const response = await api.post('/order', order, {withCredentials: true})
    return response.data
}

export default {getAllOrder, getOrderById, addOrder}



