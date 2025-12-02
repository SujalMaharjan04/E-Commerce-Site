import api from '../services/api'

const baseUrl = '/cart/users'

//Add to Cart
const addToCart = async (productId, quantity) => {
    const response = await api.post(baseUrl, {productId, quantity})
    return response.data
}


export default {addToCart}