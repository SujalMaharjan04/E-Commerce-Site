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

//Delete Item from Cart
const deleteFromCart = async (productId) => {
    const response = await api.delete(baseUrl, {data:  {productId}})
    return response.data
}


export default {getAllCart, addToCart, deleteFromCart}