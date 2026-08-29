import { useState } from 'react'
import Laptop from '../../assets/image/dell_laptop.png'
import ProductCard from '../../components/user/ProductCard'
import ReviewCard from '../../components/user/ReviewCard'
import Slider from '../../components/user/Home/Slider'
import { CategoryContext, ProductContext } from '../../context/adminContext'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategory'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoriesSlider from '../../components/user/Home/CategoriesSlider'

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
            <div>
                <Slider />
            </div>

            {/* Shop by Categories */}
            <div className = "relative lg:w-full lg:min-h-96 mt-8 px-4 flex flex-col justify-center items-center">
                <div>
                    <h1 className = "font-bold text-lg lg:text-2xl">Shop By Categories</h1>
                </div>
                <CategoriesSlider categories = {categories} />
            </div>
        </div>
    )
}

export default Home