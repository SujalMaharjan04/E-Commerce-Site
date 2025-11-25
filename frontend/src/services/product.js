import api from './api'

const baseUrl = '/products'

const getAll = async() => {
    const response = await api.get(baseUrl)
    return response.data
} 

const getById = async (id) => {
    const response = await api.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async(newProduct) => {
    const formData = new FormData()
    formData.append('name', newProduct.name)
    formData.append('description', newProduct.description)
    formData.append('price', (newProduct.price))
    formData.append('stock', newProduct.stock)
    formData.append('brand', newProduct.brand)
    formData.append('category', newProduct.category)

    if (newProduct.image) {
        formData.append('image', newProduct.image)
    }

    const response = await api.post(baseUrl, formData)

    return response.data
}

const edit  = async(id, newProduct) => {
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

    const response = await api.put(`${baseUrl}/${id}`, formData)

    return response.data
}

const deleteProduct = async(id) => {
    const response = await api.delete(`${baseUrl}/${id}`)
    return response
}

export default {getAll, create, edit, deleteProduct, getById}
