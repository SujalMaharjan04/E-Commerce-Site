import { useContext, useEffect } from 'react'
import userService from '../../services/user'
import { UsersContext } from '../../context/adminContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const UserTable = ({selected}) => {
    const [users, dispatchUsers] = useContext(UsersContext)
    const query = useQueryClient()

    //Users Query to get all Users
    const user = useQuery({
        queryKey: ['users'],
        queryFn: userService.getUser
    })

    useEffect(() => {
        if (user.data) {
            dispatchUsers({
                type: 'SET_USERS',
                payload: user.data
            })
        }
    }, [user.data])


    //Mutation for Users
    const userToChange = useMutation({
        mutationFn: ({id, newUsers}) => userService.update(id, newUsers),
        onSuccess: (
            query.invalidateQueries(['users'])
        )
    })

    const update = async(user) => {
        const newRole = user.role === 'Admin' ? 'Customer' : 'Admin'
        await userToChange.mutateAsync({id: user.id, newUsers: {role: newRole}})
    }

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
                            )}</td>
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