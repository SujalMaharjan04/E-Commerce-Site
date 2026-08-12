import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import productService from "../services/product"

//Get all products
export function useProducts(category) {
    return useInfiniteQuery({
        queryKey: ['products', category],
        queryFn:({pageParam = null}) =>  productService.getAll({category, pageParam}),
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })
}

//Get Individual Product
export function useProduct(productId) {
    return useQuery({
        queryKey: ['product'],
        queryFn: () => productService.getById(productId),
        enabled: !!productId
    })
}

//Add Product
export function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: productService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product']})
        }
    })
}


//Edit Product
export function useEditProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: productService.edit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product']})
        }
    })
}

//Delete Product
export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: productService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product']})
        }
    })
}
