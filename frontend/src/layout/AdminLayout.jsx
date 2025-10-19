import SideBar from "../components/admin/SideBar"
import AdminNavBar from "../components/admin/AdminNavbar"
import { Outlet } from "react-router-dom"
import { useContext } from "react"
import {NotificationContext} from "../context/NotificationContext"

const AdminLayout = () => {
    const [notification, dispatch] = useContext(NotificationContext)

    const baseStyle = "fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white font-medium transition-opacity duration-500";
    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
    };
    return (
        <div className = "flex flex-row bg-gray-300 gap-10">
            <SideBar />
            <div className = "flex flex-col flex-1">
                <AdminNavBar />
                {notification && (
                    <div className = {`${baseStyle} ${typeStyles[notification.type]}`}>
                        {notification.text}
                    </div>
                )}
                <main className = "flex-1 "><Outlet /></main>
            </div>
           
        </div>
    )
}

export default AdminLayout