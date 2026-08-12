import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import categoryService from "../services/category"


//Get all categories
export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getAll
    })
}

//Add Category
export function useCreateCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: categoryService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['category']})
        }
    })
}

//Edit Category
export function useEditCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: categoryService.edit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['category']})
        }
    })
}

//Delete Category
export function useDeleteCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: categoryService.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['category']})
        }
    })
}