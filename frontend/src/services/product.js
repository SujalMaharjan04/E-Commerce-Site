import axios from 'axios'
const baseurl = 'http://localhost:3001/api'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const setProduct = async(product, token) => {
    const response = await axios.post(`${baseurl}/products`, product, token)
    return response.data
}

export default {setProduct}