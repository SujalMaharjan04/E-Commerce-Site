import { Link, useNavigate } from "react-router-dom"

const ProductPageCard = ({product}) => {
    const navigate = useNavigate()
    return (
        <div className = "my-2 md:grid md:grid-cols-[auto_1fr] md:min-h-60 md:mb-2 bg-[#BFC7E2] text-[#090F13]">
            <Link to = {`/products/${product.id}`}>
                <div className = "bg-[#BFC7E2] md:mx-16 md:my-4  md:w-full  md:min-h-32 md:shadow-[-8px_-8px_12px_2px_rgba(0,0,0,0.25),8px_8px_12px_2px_rgba(0,0,0,0.25)] md:flex md:justify-center md:items-center">
                    <img src = {product.image[0]} alt = "Image 1" className = "md:h-48 md:w-48" loading = "lazy" />
                </div>
            </Link>

            <div className = "flex flex-col justify-center items-start ml-2 gap-2  md:ml-20 md:min-h-48">
                <div>
                    <Link to = {`/products/${product.id}`}>
                        <p className = "md:leading-6 md:min-h-12">{product.name}</p>
                    </Link>
                    <p>Rs {product.price}</p>
                </div>
                <div className = "w-full">
                    <button type = "button" className = "bg-[#E09F75] text-md w-[50%] mb-2 md:w-[20%] md:h-[20%] text-center md:my-14  rounded-lg font-bold md:text-lg hover:cursor-pointer" onClick = {() => navigate(`/products/${product.id}`)}>See Option</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPageCard