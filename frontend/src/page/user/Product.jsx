import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import productService from '../../services/product'
import Sidebar from "../../components/user/Sidebar"
import ProductPageCard from "../../components/user/ProductPageCard"

const Product = () => {
    const [selectedBrand, setSelectedBrand] = useState('')
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

    products = selectedBrand 
        ? products.filter(p => p.brand === selectedBrand)
        : products

    return (
        <div className = "md:flex md:flex-row md:justify-evenly ">
            <div className = "bg-[#BFC7E2] md:min-w-[15%] md:h-fit md:ml-20 md:flex md:flex-col md:justify-evenly md:items-center">
                <Sidebar selectedBrand = {selectedBrand} onBrandChange = {setSelectedBrand}/>

            </div>
            <div className = "md:flex md:flex-col md:flex-1 md:mx-10  ">
                {products.map(product => (
                    <ProductPageCard product = {product} />
                ))}
            </div>
        </div>
    )
}

export default Product