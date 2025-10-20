import laptop from '../../assets/image/dell_laptop.png'
import {Star} from 'lucide-react'
const ProductCard = (props) => {
    const maxStar = 5
    return (
        <div className = "flex flex-col w-[20%]">
            <div>
                <img src = {laptop} alt = "laptop" className = "h-60 w-auto" />
            </div>
            <div className = "text-[#090F13]">
                <p>Apple 2025 MacBook Air 13-inch Laptop with M4 chip: Built for Apple Intelligence, 13.6-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Sky Blue</p>
            </div>

            <div className = "flex items-center mt-5">
                {Array.from({length: maxStar}, (_, i) => {
                    <Star key = {i} size = {20} className = {i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                })}
            </div>

            <div className = "text-[#090F13]">
                Rs 3,99,999.00
            </div>

            <div className = "flex justify-center items-center">
                <button className = "border border-solid border-2 bg-[#E09F75] w-[70%] rounded-xl my-5 h-8 hover:bg-[#DF8E64]">Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductCard