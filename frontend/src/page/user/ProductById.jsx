import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import productService from '../../services/product'
import { useContext, useState } from "react"
import Location from '../../assets/icons/location_on.svg'
import { UsersContext } from "../../context/adminContext"


const ProductById = () => {
    const [img, setImg] = useState('')
    const [size, setSize] = useState(null)
    const [style, setStyle] = useState(null)
    const [users, dispatchUsers] = useContext(UsersContext)
    const [quantity, setQuantity] = useState(1)
    const {id} = useParams()

    const {data: product, isLoading, isError, error} = useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getById(id),
        enabled: !!id
    }) 


    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error Fetching Data</h1>

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
                                <button key = {index} className = 'h-10 w-10 rounded-full hover:cursor-pointer' style = {{backgroundColor: color}} ></button>
                            </>
                        ))}

                    </div>

                    <p>Size: <strong>{size ? size : product.specs.ram[0]} Unified Memory</strong></p>
                    <div className = "flex justify-start items-center gap-4 font-bold">
                        <button className = "bg-gray-500/75 h-10 w-auto  rounded-lg p-2 hover:cursor-pointer" onClick = {(e) => setSize(product.specs.ram[0])}>{product.specs.ram[0]} Unified Memory</button>
                        <button className = "bg-gray-500/75 h-10 w-auto  rounded-lg p-2 hover:cursor-pointer" onClick = {(e) => setSize(product.specs.ram[1])}>{product.specs.ram[1]} Unified Memory</button>
                    </div>

                    <p>Style Name: <strong>{style ? style : product.specs.storage[0]}</strong></p>
                    <div className = "flex justify-start items-center gap-4 font-bold">
                        <button className = "bg-gray-500/75 h-10 w-auto  rounded-lg p-2" onClick = {(e) => setStyle(product.specs.storage[0])}>{product.specs.storage[0]} </button>
                        <button className = "bg-gray-500/75 h-10 w-auto  rounded-lg p-2" onClick = {(e) => setStyle(product.specs.storage[1])}>{product.specs.storage[1]} </button>
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
                </div>

                {/*Address and Change Address function Section */}
                <div className = "bg-[#BFC7E2] h-52 w-64 rounded-lg p-5 ">
                    <div className = "flex flex-col justify-between items-start gap-4">
                        <div className = "flex justify-center items-center gap-2">
                            <img src = {Location} />
                            {/* <p>Delivering to {users.address.map(add => `${add.street}, ${add.zip || ''} ${add.state}, ${add.city}, ${add.country}`)} </p> */}
                            <p>Delivering to </p>
                        </div>

                        <div className = "bg-[#D9D9D9] h-10 w-full flex justify-evenly items-center rounded-xl">
                            <span className = "font-bold text-xl">Quantity: <input type = "number" value = {quantity} onChange = {(e) => setQuantity(prev => prev < product.stock ? e.target.value : product.stock)} className = "w-10 m-0" /></span>
                            <button type = "button" className = "text-2xl hover:cursor-pointer " onClick = {() => setQuantity(prev => prev < product.stock ? prev + 1 : product.stock)}>+</button>
                            <button type = "buttont" className = "text-2xl hover:cursor-pointer " onClick={() => setQuantity(prev => prev > 1 ?quantity - 1 : 1)}>-</button>
                        </div>
                        
                        {quantity >= product.stock 
                                ? <p className = "text-red-500">Maximum Stock Reached</p>
                                : null}
                        <div className = "flex flex-col justify-center items-center w-[75%] gap-4 ml-5">
                            <button type = "button" className = "bg-[#E09F75] text-xl font-bold rounded-full w-full">Add To Cart</button>

                            <button type = "button" className = "bg-[#E09F75] text-xl font-bold rounded-full w-full">Buy Now</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductById