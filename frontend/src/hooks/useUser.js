import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import userService from '../services/user'


export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => userService.getUser()
    })
}

export function useUserAddr() {
    return useQuery({
        queryKey: ['user-address'],
        queryFn: () => userService.getUserInfo()
    })
}

export function useChangeRole() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, newUsers}) => userService.update(id, newUsers),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    })
}