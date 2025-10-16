import api from './api'

const baseUrl = '/products'

const getAll = async() => {
    const response = await api.get(baseUrl)
    return response.data
} 

const create = async(newProduct) => {
    const formData = new FormData()
    formData.append('name', newProduct.name)
    formData.append('description', newProduct.description)
    formData.append('price', newProduct.price)
    formData.append('stock', newProduct.stock)
    formData.append('brand', newProduct.brand)
    formData.append('category', newProduct.category)

    if (newProduct.image) {
        formData.append('image', newProduct.image)
    }

    const response = await api.post(baseUrl, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    })

    return response.data
}

export default {getAll, create}
