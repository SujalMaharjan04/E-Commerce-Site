import api from './api'

const baseUrl = '/products'

//Function to Get All Product
const getAll = async() => {
    const response = await api.get(baseUrl)
    return response.data
} 

//Function to Get Product By Id
const getById = async (id) => {
    const response = await api.get(`${baseUrl}/${id}`)
    return response.data
}

//Function to Create Prouduct By Admin
const create = async(newProduct) => {
    const formData = new FormData()
    formData.append('name', newProduct.name)
    formData.append('description', newProduct.description)
    formData.append('price', (newProduct.price))
    formData.append('stock', newProduct.stock)
    formData.append('brand', newProduct.brand)
    formData.append('category', newProduct.category)
    formData.append('specs', JSON.stringify(newProduct.specs))

    if (newProduct.image) {
        formData.append('image', newProduct.image)
    }

    const response = await api.post(baseUrl, formData)

    return response.data
}

//Function to Edit Product By Admin
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

//Function to delete Product By Admin
const deleteProduct = async(id) => {
    const response = await api.delete(`${baseUrl}/${id}`)
    return response.data
}



export default {getAll, create, edit, deleteProduct, getById}
