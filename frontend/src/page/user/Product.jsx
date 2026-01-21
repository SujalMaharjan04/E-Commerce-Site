import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import productService from '../../services/product'
import Sidebar from "../../components/user/Sidebar"
import ProductPageCard from "../../components/user/ProductPageCard"

const Product = () => {
    const [searchFilter, setSearchFilter] = useState({
        "brand": "",
        "ram": ""
    })
    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")
    const {data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["product", category],
        queryFn: ({pageParam = null}) => productService.getAll({
            category, 
            cursor: pageParam
        }), 
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })

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
        <div className = "md:flex md:flex-row md:justify-evenly ">
            <div className = "bg-[#BFC7E2] md:min-w-[15%] md:h-fit md:ml-20 md:flex md:flex-col md:justify-evenly md:items-center">
                <Sidebar searchFilter = {searchFilter} onFilterChange = {handleFilter}/>

            </div>
            <div className = "md:flex md:flex-col md:flex-1 md:mx-10  ">
                {products.map(product => (
                    <ProductPageCard key = {product.id} product = {product} />
                ))}
            </div>
        </div>
    )
}

export default Product