import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import cartService from '../services/cart'

export function useCarts() {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => cartService.getAllCart()
    })
}

export function useAddToCart() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({productId, quantity, selectedSpecs}) => cartService.addToCart(productId, quantity, selectedSpecs),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cart']})
        }
    })
}

export function useDeleteFromCart() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (productId) => cartService.deleteFromCart(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cart']})
        }
    })
}