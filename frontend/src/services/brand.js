import api from './api'
const baseUrl = '/brand'

const create = async (newBrand) => {
    const formData = new FormData()
    formData.append('name', newBrand.name)
    formData.append('description', newBrand.description)
    if (newBrand.image) {
        formData.append('image', newBrand.image)
    }
    const response = await api.post(baseUrl, newBrand, {
        headers: {'Content-Type': 'multipart/form-data'}
    })

    return response.data
}

export default {create}