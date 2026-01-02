import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import productService from '../../services/product'
import Sidebar from "../../components/user/Sidebar"

const Product = () => {
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
    
    const products = data.pages.flatMap(page => page.products)
    
    return (
        <div>
            <Sidebar />
        </div>
    )
}

export default Product