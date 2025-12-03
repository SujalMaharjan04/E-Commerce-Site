import api from '../services/api'

const baseUrl = '/cart/users'

//Get All Cart Item
const getAllCart = async () => {
    const response = await api.get(baseUrl)
    
    return response.data
}

//Add to Cart
const addToCart = async (productId, quantity, selectedSpecs) => {
    const response = await api.post(baseUrl, {productId, quantity, selectedSpecs})
    return response.data
}


export default {getAllCart, addToCart}