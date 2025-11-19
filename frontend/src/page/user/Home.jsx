import Laptop from '../../assets/image/dell_laptop.png'
import ProductCard from '../../components/user/ProductCard'
import ReviewCard from '../../components/user/ReviewCard'
import Slider from '../../components/user/Slider'
const Home = () => {
    return (
        <div className = "bg-[#EFEBCE]">
            <Slider />
            {/* Best Seller Section */}
            <div>
                <div className = "flex justify-center items-center py-5">
                    <h2 className = "text-4xl">Best Sellers</h2>
                </div>
                <div className = "bg-[#BFC7E2]">
                    <div className = "flex justify-end items-center">
                        <button className = " border-solid border-2 bg-[#E09F75] w-60 h-10 m-4 text-2xl hover:bg-[#DF8E64]" >Shop All Products</button>
                    </div>
                    
                    <div className = "flex flex-row justify-evenly items-center">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>  
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
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                    <div className = "flex flex-col justify-center items-center bg-[#BFC7E2]">
                        <img src = {Laptop} alt = "Laptop" className = "w-auto h-60" />
                        <h3 className = "text-xl p-2">Laptop</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home