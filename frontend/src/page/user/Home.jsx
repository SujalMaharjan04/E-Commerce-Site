import { useState } from 'react'
import Laptop from '../../assets/image/dell_laptop.png'
import ProductCard from '../../components/user/ProductCard'
import ReviewCard from '../../components/user/ReviewCard'
import Slider from '../../components/user/Slider'
import { CategoryContext, ProductContext } from '../../context/adminContext'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategory'

const Home = () => {
    const [current, setCurrent] = useState(0)

    const next = () => {
        if (current < products.length - 3) {
            setCurrent(current + 1)
        }
    }

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1)
        }
    }
    const {data, isLoading: productLoading, isError: productError} = useProducts()
    
    const {data: categories, isLoading: categoriesLoading, isError: categoriesError} = useCategories()

    const products = data?.pages?.flatMap(page => page.products) ?? []

    if (productLoading) return <div>Loading.....</div>
    if (categoriesLoading) return <div>Loading...</div>

    if (productError) return <div>Error</div>
    if (categoriesError) return <div>Error</div>

    return (
        <div>
            
        </div>
    )
}

export default Home