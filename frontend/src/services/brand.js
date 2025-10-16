import api from './api'
const baseUrl = '/brand'


const getAll = async() => {
    const response = await api.get(baseUrl)
    return response.data
}

const create = async (newBrand) => {
    const formData = new FormData()
    formData.append('name', newBrand.name)
    formData.append('description', newBrand.description)
    if (newBrand.image) {
        formData.append('image', newBrand.image)
    }
    const response = await api.post(baseUrl, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    })

    return response.data
}

export default {getAll, create}