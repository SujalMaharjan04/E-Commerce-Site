import { Link, useNavigate } from "react-router-dom"
import StarDisplay from "../../components/common/StarDisplay"

const ProductPageCard = ({product}) => {
    const navigate = useNavigate()

    return (
        <div className = "bg-[#0F172A] w-full h-[361px] lg:m-2 text-[#F8FAFC] flex justify-start items-center">
            <Link to = {`/products/${product.id}`} className = "block shrink-0">
                <div className = "border-2 border-white lg:min-w-[25%] lg:min-h-[85%] lg:p-16 lg:mx-14">
                    <img src = {product.image[0]} loading = 'lazy' className = "lg:w-48 lg:h-48 object-contain"  />
                </div>
            </Link>

            <div className = "lg:min-w-[50%] lg:flex lg:flex-col lg:justify-start lg:items-start lg:mx-12">
                <Link to = {`/products/${product.id}`}>
                    <div className="lg:text-2xl text-justify">
                        {product.name}
                    </div>
                    <div>
                        <StarDisplay rating = {5} />
                    </div>

                    <div className="text-xl font-bold">
                        Rs {product.price}
                    </div>
                </Link>

                <button className = "bg-linear-to-br from-[#3B82F6] to-[#4084f1]  rounded-xl lg:p-4 lg:mt-4 lg:text-2xl font-bold hover:cursor-pointer hover:bg-linear-to-br hover:from-[#327df5] hover:to-[#2862be] " onClick = {navigate(`/products/${product.id}`)}>Get More Info</button>
            </div>
        </div>
    )
}

export default ProductPageCard