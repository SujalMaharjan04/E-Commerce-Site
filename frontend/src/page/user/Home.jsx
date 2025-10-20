import ProductCard from '../../components/user/ProductCard'
import Slider from '../../components/user/Slider'
const Home = () => {
    return (
        <div className = "bg-[#EFEBCE]">
            <Slider />
            <div>
                <div className = "flex justify-center items-center my-5">
                    <h2 className = "text-4xl">Best Sellers</h2>
                </div>
                <div className = "bg-[#BFC7E2]">
                    <div className = "flex justify-end items-center">
                        <button className = "border border-solid border-2 bg-[#E09F75] w-60 h-10 mt-4 mr-4 text-2xl hover:bg-[#DF8E64]" >Shop All Products</button>
                    </div>
                    
                    <div className = "flex flex-row justify-evenly items-center">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>  

                </div>
            </div>
        </div>
    )
}

export default Home