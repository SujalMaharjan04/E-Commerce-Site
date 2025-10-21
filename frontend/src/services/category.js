import api from './api'

const baseUrl = '/category'

const getAll = async() => {
    const response = await api.get(baseUrl)
    return response.data
}

const create = async(newCategory) => {
    const formData = new FormData()
    formData.append('name', newCategory.name)
    formData.append('description', newCategory.description)
    if (newCategory.image) {
        formData.append('image', newCategory.image)
    }

    const response = await api.post(baseUrl, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    })

    return response.data
}

const edit = async(id, newCategory) => {
    const formData = new FormData()
    formData.append('name', newCategory.name)
    formData.append('description', newCategory.description)

    if (newCategory.image) {
        formData.append('image', newCategory.image)
    }

    const response = await api.put(`${baseUrl}/${id}`, formData)
    return response.data
}

const deleteCategory = async(id) => {
    const response = await api.delete(`${baseUrl}/${id}`)
    return response.data
}

export default {getAll, create, edit, deleteCategory}