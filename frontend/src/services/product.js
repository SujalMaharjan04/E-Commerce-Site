import api from './api'

const baseUrl = '/products'


//Function to get all product for admin

const getProductAdmin = async() => {
    const response = await api.get(`${baseUrl}/admin`)
    return response.data
}

//Function to Get All Product
const getAll = async({category, cursor}) => {
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    if (cursor) params.append("cursor", cursor)
    const response = await api.get(`${baseUrl}?${params}`)
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



export default {getAll, create, edit, deleteProduct, getById, getProductAdmin}
