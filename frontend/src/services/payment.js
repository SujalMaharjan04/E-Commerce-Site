import api from './api'

const initiate = async ({orderId, paymentMethod}) => {
    const response = await api.post('/payment/initiate', {orderId, paymentMethod}, {withCredentials: true})
    return response.data
}

export default {initiate}