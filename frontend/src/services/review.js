import axios from 'axios'
import api from './api'

const getReview = async(id) => {
    const response = await api.get(`/products/${id}/review`)
    return response.data
}

const addReview = async(id, comment, rating) => {
    const response = await api.post(`/products/${id}/review`, {comment, rating})
    return response.data
}

export default {getReview, addReview}