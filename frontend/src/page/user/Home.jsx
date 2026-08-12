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
        <div className = "bg-[#EFEBCE]">
            <Slider />
            {/* Best Seller Section */}
            <div >
                <div className = "flex justify-center items-center py-5">
                    <h2 className = "text-4xl">Best Sellers</h2>
                </div>
                <div className = "bg-[#BFC7E2] relative">
                    <div className = "flex justify-end items-center">
                        <button className = " border-solid border-2 bg-[#E09F75] w-60 h-10 m-4 text-2xl hover:bg-[#DF8E64]" >Shop All Products</button>
                    </div>
                    
                    <div className = "overflow-hidden">
                        <div className = "flex flex-row justify-evenly items-center transition-transform duration-500" style = {{transform: `translate(-${current * 100}%)`}}>
                             {/* {products.map(product =>{
                                return (
                                    <div className = "min-w-1/3 px-2" key = {product.id}>
                                        <Link to = {`/product/${product.id}`}><ProductCard product = {product}/></Link>
                                    </div>
                                
                            )})} */}
                        </div>  
                    </div>

                    <button type = "button" onClick = {next} className = "absolute top-[40%] right-0 bg-[#BFC7E2] rounded-full h-12 w-12 opacity-0 hover:opacity-50">&rarr;</button>
                    <button type = "button" onClick = {prev} className = "absolute top-[40%] bg-[#BFC7E2] rounded-full h-12 w-12 opacity-0 hover:opacity-50">&larr;</button>
                    
                </div>
            </div>

            { /*Product Review Section */}
            <div>
                <div className = "flex justify-center items-center py-5">
                    <h2 className = "text-4xl">Product Review</h2>
                </div>
                    <ReviewCard />
            </div>

            { /*Categories Section*/ }
            <div>
                <div className = "flex justify-center items-center py-5">
                    <h2 className = "text-4xl">Categories</h2>
                </div>
                <div className = "grid grid-cols-4 gap-1">
                    {categories.map(category => (
                        <Link to = {`/products?category=${category.id}`} key = {category.id}>
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Laptop" className = "w-auto h-30 md:h-60" />
                            <h3 className = "text-xl p-2">{category.name}</h3>
                        </div>
                    </Link>
                    ))}
                    {/* <Link to = "/products?category=Laptop">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Laptop</h3>
                        </div>
                    </Link>
                    <Link to = "/products?category=Smartphone">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Smartphone" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Smartphone</h3>
                        </div>
                    </Link>
                    <Link to = "/products?category=Tablet">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Tablet" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Tablet</h3>
                        </div>
                    </Link>
                    <Link to = "/products?category=Camera">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Camera" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Camera</h3>
                        </div>
                    </Link>
                    <Link to = "/products?category=Headphone">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Headphone" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Headphones</h3>
                        </div>
                    </Link>
                    <Link to = "/products?category=Accessories">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Accessories" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Accessories</h3>
                        </div>
                    </Link>
                    <Link to = "/products?category=Laptop">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Laptop</h3>
                        </div>
                    </Link>
                    <Link to = "/products?category=Laptop">
                        <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                            <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                            <h3 className = "text-xl p-2">Laptop</h3>
                        </div>
                    </Link> */}
                </div>

            </div>
        </div>
    )
}

export default Home