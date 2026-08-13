import { useContext, useEffect } from 'react'
import userService from '../../services/user'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAuthStore from '../../store/auth.store'
import { useChangeRole, useUsers } from '../../hooks/useUser'
import useNotificationStore from '../../store/notification.store'

const UserTable = ({selected}) => {
    const {data: users, isLoading: userLoading, isError: userError}= useUsers()
    const userToChange = useChangeRole()
    const notify = useNotificationStore(state => state.notify)

    const update = async(user) => {
        console.log("User:", user)
        console.log("Token: ", useAuthStore.getState().token)
        const newRole = user.role === 'Admin' ? 'Customer' : 'Admin'
        await userToChange.mutateAsync({id: user.id, newUsers: {role: newRole}}, {
            onSuccess: () => {
                notify("User role changed", "success")
            },
            onError: () => {
                notify("Role Changed failed", "error")
            }
        })
    }

    if (userLoading) return <div>Loading....</div>
    if (userError) return <div>Error</div>
    return (
        <div className = "mt-4">
            <table className = "w-full table-auto border-collapse  border-solid border-2 text-[#090F13]">
                <thead>
                    <tr className = "border-2">
                        <th >Name</th>
                        <th >Address</th>
                        <th >Phone Number</th>
                        <th >Email</th>
                        <th >Role</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody className = "text-center">
                    {users.filter(user => user.role === selected).map((user) => {
                        return (
                        <tr key = {user.id} className = "border-2">
                            <td>{user.name}</td>
                            <td>{user.address.map(add => 
                                `${add.street}, ${add.zip || ''}, ${add.state}, ${add.city}, ${add.country}`
                            ).join('; ')}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button type = "button" onClick = {() => update(user)} className = "border-2 border-black bg-red-500 text-[#090F13] rounded-lg m-2 w-48 hover:bg-red-700 hover:cursor-pointer">Toggle Role</button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable