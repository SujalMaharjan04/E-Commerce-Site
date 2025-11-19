import { useState } from "react"
import UserTable from "../../components/admin/UserTable"


const AdminUsers = () => {
    const [selected, setSelected] = useState('Customer')
    
    return (
        <div className = "text-[#090F13] ml-4">
            <h2 className = "text-xl font-bold">Users</h2>
            <div className = "flex justify-end items-start mr-4">
                <select className = "bg-white w-24" value = {selected} onChange = {(e) => setSelected(e.target.value)}>
                    <option>Customer</option>
                    <option>Admin</option>
                </select>
            </div>
            <UserTable selected = {selected} />   
        </div>
    )
}

export default AdminUsers