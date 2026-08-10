import SideBar from "../components/admin/SideBar"
import AdminNavBar from "../components/admin/AdminNavbar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
    return (
        <div className = "flex flex-row bg-gray-300 gap-10">
            <SideBar />
            <div className = "flex flex-col flex-1">
                <AdminNavBar />
                <main className = "flex-1 "><Outlet /></main>
            </div>
           
        </div>
    )
}

export default AdminLayout