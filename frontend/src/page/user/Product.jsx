import { useState} from "react"
import { useSearchParams } from "react-router-dom"
import Sidebar from "../../components/user/Sidebar"
import ProductPageCard from "../../components/user/ProductPageCard"
import { useProducts } from "../../hooks/useProducts"

const Product = () => {
    const [searchFilter, setSearchFilter] = useState({
        "brand": "",
        "ram": ""
    })
    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")

    const {data, isLoading, isError} = useProducts(category)

    if (isLoading) return (<h1>Loading....</h1>)
    if (isError) return (<h1>Error Getting Data</h1>)
    
    let products = data.pages.flatMap(page => page.products)

    const handleFilter = (key, value) => {
        setSearchFilter(prev => ({
            ...prev,
            [key]: prev[key] === value ? "" : value
        }))
    }

    const filterResolver = {
        brand: p => p.brand,
        ram: p => p.specs?.ram
    }

    const hasValue = v => v !== "" && v != null


    products = products.filter(p => 
        Object.entries(searchFilter).every(([key, value]) => {
            if (!hasValue(value)) return true
            const resolver = filterResolver[key]

            if (!resolver) return true

            const productValue = resolver(p)

            if (Array.isArray(productValue)) {
                return productValue.some(v => String(v) === String(value))
            }

            return String(productValue) === String(value)
        })
    )

    

    return (
        <>
            <div className = "flex justify-center items-center m-6">
                <h1 className = "text-2xl font-bold">Laptop</h1>
            </div>
            <div className = "lg:flex lg:flex-row lg:justify-evenly ">
                <div className = "bg-[#0F172A] lg:min-w-[15%] lg:h-fit lg:ml-20 lg:flex lg:flex-col lg:justify-evenly lg:items-center lg:mt-2 lg:p-8 lg:rounded-lg">
                    <Sidebar searchFilter = {searchFilter} onFilterChange = {handleFilter}/>

                </div>
                <div className = "grid grid-cols-3 gap-1 lg:flex lg:flex-col lg:flex-1 lg:mx-10  ">
                    {products.map(product => (
                        <ProductPageCard key = {product.id} product = {product} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Product