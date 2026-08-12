import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import brandService from "../services/brand"

//Get all Brands
export function useBrands() {
    return useQuery({
        queryKey: ['brands'],
        queryFn: brandService.getAll
    })
}

//Add brand
export function useCreateBrand() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: brandService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['brand']})
        }
    })
}

//Edit brand
export function useEditBrand() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: brandService.edit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['brand']})
        }
    })
}

//Delete brand
export function useDeleteBrand() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: brandService.deleteBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['brand']})
        }
    })
}