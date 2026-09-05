import React from "react"
import { useEffect } from "react"
import { useQuery} from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { LocateIcon } from "lucide-react"
import { ReviewContext } from '../../context/reviewContext'
import reviewService from '../../services/review'
import Review from "../../components/user/Review"
import ProductReview from "../../components/user/Product_Reivews"
import { useProduct } from "../../hooks/useProducts"
import useNotificationStore from "../../store/notification.store"
import useAuthStore from "../../store/auth.store"
import { useUserAddr } from "../../hooks/useUser"
import { useAddToCart } from "../../hooks/useCart"
// import { useCartStore } from "../../store/cart.store"


const ProductById = () => {
    const [img, setImg] = useState('')
    const [size, setSize] = useState(null)
    const [style, setStyle] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedSpecs, setSelectedSpecs] = useState({})
    const [selectedColor, setSelectedColor] = useState(false)
    const [selectedRam, setSelectedRam] = useState(false)
    const [selectedStorage, setSelectedStorage] = useState(false)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const notify = useNotificationStore(state => state.notify)
    const {id} = useParams()
    const userAddrQuery = useUserAddr()
    const [review, dispatchReview] = useContext(ReviewContext)
    // const setItems = useCartStore(state => state.setItems)
    const addCart = useAddToCart()
    
    
    const userAddr = userAddrQuery.data


    //Func to load Review
    const reviewResult = useQuery({
        queryKey: ['review', id],
        queryFn: () => reviewService.getReview(id),
        enabled: !!id
    })

    useEffect(() => {
        dispatchReview({
            type: "SET_REVIEW",
            payload: reviewResult.data
        })
    }, [reviewResult.data])

    
    const {data: product, isLoading, isError} = useProduct(id)

    console.log(product)
    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error Fetching Data</h1>

    //Object of Product Specs
    const productSpecs = {
        "Brand": product.brand.name,
        "Model Name": product.specs.modalName,
        "Screen Size": product.specs.display,
        "Color": product.specs.colors[0] || [],
        "Hard Disk Size": product.specs.storage[0] || [],
        "CPU Model": product.specs.processor,
        "RAM Memory Installed Size": product.specs.ram[0] || [],
        "Operating System": product.specs.OS || '',
        "Graphic Card Description": product.specs.gpu,
    }

    const handleAddSpecs = (key, value) => {
        setSelectedSpecs(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const addCartItem = (productId, quantity, selectedSpecs) => {

        if (!isAuthenticated) {
            notify("Log In to Add to Cart", "error")

            setQuantity(1)
            setStyle(null)
            setSize(null)
            setSelectedColor(false)
            setSelectedStorage(false)
            setSelectedRam(false)
            return 
        }
        addCart.mutateAsync({productId, quantity: Number(quantity), selectedSpecs: selectedSpecs}, {
            onSuccess: () => {
                notify("Item Added to Cart", "success")
                // setItems(data)
                setQuantity(1)
                setStyle(null)
                setSize(null)
                setSelectedColor(false)
                setSelectedStorage(false)
                setSelectedRam(false)
            }
        })
    }

    return (
        <div className = "mx-5 my-10">
            <div className = "grid grid-cols-[auto_auto_1fr_auto] gap-24">

                {/* Side picture button for multiple angle */}
                <div className = "flex flex-col gap-2">
                    <div className = "border-2 bg-[#BFC7E2] h-10 w-10">
                        <button type = "button" onClick = {() => setImg(product.image[0])}><img src = {product.image[0]} className = "h-8 w-auto" /></button>
                    </div>
                    <div className = "border-2 bg-[#BFC7E2] h-10 w-10">
                        <button type = "button" onClick = {() => setImg(product.image[0])}><img src = {product.image[0]} className = "h-8 w-auto" /></button>
                    </div>
                    <div className = "border-2 bg-[#BFC7E2] h-10 w-10">
                        <button type = "button" onClick = {() => setImg(product.image[0])}><img src = {product.image[0]} className = "h-8 w-auto" /></button>
                    </div>
                    <div className = "border-2 bg-[#BFC7E2] h-10 w-10">
                        <button type = "button" onClick = {() => setImg(product.image[0])}><img src = {product.image[0]} className = "h-8 w-auto" /></button>
                    </div>
                </div>

                {/*This is the main image part */}
                <div className = "bg-[#BFC7E2] h-64 w-80">
                    <img src = {img ? img : product.image[0]} className = "object-cover" />
                </div>

                {/*Product info Section */}
                <div className = "text-[#090F13] flex flex-col gap-4 overflow-auto">
                    <div className = "space-y-2">
                        <h1>{product.name}</h1>
                        <h1>Rs {product.price}</h1>
                    </div>
                    
                    <hr className = "border-2 rounded-lg text-white" />

                    <div className = "flex justify-start items-center gap-4" >
                        {product.specs.colors.map((color, index) => (
                            <>
                                <button key = {index} className = {`h-10 w-10 rounded-full hover:cursor-pointer  hover:shadow-[0_0_10px_#00f] ${selectedColor === color ? " shadow-[0_0_5px_#00f]" : "border-none"}`} style = {{backgroundColor: color}} onClick = {() => {
                                    setSelectedColor(color)
                                    handleAddSpecs('colors', color)}} ></button>
                            </>
                        ))}

                    </div>

                    <p>Size: <strong>{size ? size : product.specs.ram[0]} Unified Memory</strong></p>
                    <div className = "flex justify-start items-center gap-4 font-bold">

                        {product.specs.ram.map((r, index) => (
                            <>
                                <button key = {index} className = {`bg-gray-500/75 h-10 w-full  rounded-lg  hover:cursor-pointer ${selectedRam === r ? "border-black border-2": "border-none"}`} onClick = {() => {
                                    setSelectedRam(r)
                                    setSize (r)
                                    handleAddSpecs('ram', r)}}>{r} Unified Memory</button>
                            </>
                        ))}
                        
                    </div>

                    <p>Style Name: <strong>{style ? style : product.specs.storage[0]}</strong></p>
                    <div className = "flex justify-start items-center gap-4 font-bold">
                        {product.specs.storage.map((s, index) => (
                            <>
                                <button key = {index} className = {`bg-gray-500/75 h-10 w-[20%]  rounded-lg  hover:cursor-pointer ${selectedStorage === s ? "border-black border-2": "border-none"}`} onClick = {() => {
                                    setSelectedStorage(s)
                                    setStyle(s)
                                    handleAddSpecs('storage', s)}}>{s} </button>
                            </>
                        ))}
                        
                    </div>

                    <div className = "grid grid-cols-2 gap-4">
                        {Object.entries(productSpecs).map(([key, value]) => (
                            <React.Fragment key = {key}>
                                <strong>{key}</strong>
                                <p>{value}</p>
                            </React.Fragment>
                        ))}
                    </div>
                    
                    <h1 className = "font-bold text-2xl">About this item</h1>
                    <ul className = "list-disc ml-6 space-y-1">
                        {/* {product.description.map((point, i) => (
                            <li key = {i}>{point}</li>
                        ))} */}
                    </ul>

                    {/*Comment Section */}
                    <div>
                        <div>
                            <h2 className = "font-bold text-2xl">Reviews</h2>
                        </div>

                        <div className = "bg-[#BFC7E2] md:p-4 md:rounded-lg">
                            <Review />

                            <div className = "mt-4">
                                {review?.map(r => (
                                    <ProductReview review = {r} key = {review.id} />
                                )
                                )}
                            </div>
                        
                        </div>
                    </div>
                </div>

                {/*Address and Change Address function Section */}
                <div className = "bg-[#BFC7E2] h-56 w-64 rounded-lg p-5 ">
                    <div className = "flex flex-col justify-between items-start gap-4">
                        <div className = "flex justify-center items-center gap-2">
                            <LocateIcon className = "text-slate-950 w-auto h-8" />
                            {isAuthenticated ?
                                <p>Delivering to {userAddr.address?.map(add => `${add.street}, ${add.zip || ''} ${add.state}, ${add.city}, ${add.country}`)}</p>
                                :<p>Please Log In to order</p>}
                        </div>

                        <div className = "bg-[#D9D9D9] h-10 w-full flex justify-evenly items-center rounded-xl">
                            <span className = "font-bold text-xl">Quantity: <input type = "number" value = {quantity} onChange = {(e) => {
                                const val = Number(e.target.value)
                                setQuantity(val < product.stock ? val : product.stock)}} className = "w-10 m-0" /></span>
                            <button type = "button" className = "text-2xl hover:cursor-pointer " onClick = {() => setQuantity(prev => Math.min(prev + 1, product.stock))}>+</button>
                            <button type = "buttont" className = "text-2xl hover:cursor-pointer " onClick={() => setQuantity(prev => Math.max(prev + 1, 1))}>-</button>
                        </div>
                        
                        {quantity >= product.stock 
                                ? <p className = "text-red-500">Maximum Stock Reached</p>
                                : null}
                        <div className = "flex flex-col justify-center items-center w-[75%] gap-4 ml-5">
                            <button type = "button" className = "bg-[#E09F75] text-xl font-bold rounded-full w-full hover:cursor-pointer" onClick = {() => addCartItem(product.id, quantity, selectedSpecs) }>Add To Cart</button>

                            <button type = "button" className = "bg-[#E09F75] text-xl font-bold rounded-full w-full">Buy Now</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductById