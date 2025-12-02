import api from '../services/api'

const baseUrl = '/cart/users'

//Add to Cart
const addToCart = async (productId, quantity, selectedSpecs) => {
    console.log(selectedSpecs)
    const response = await api.post(baseUrl, {productId, quantity, selectedSpecs})
    return response.data
}


export default {addToCart}