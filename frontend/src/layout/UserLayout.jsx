import Navbar from "../components/user/Navbar"
import Footer from '../components/user/Footer'
import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { NotificationContext } from "../context/NotificationContext"

const UserLayout = () => {
    const [notification, dispatch] = useContext(NotificationContext)
    
    const baseStyle = "fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white font-medium transition-opacity duration-500";
    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
    };
    return (
        <div className = "flex flex-col min-h-screen">
            <Navbar />
                {notification && (
                    <div className = {`${baseStyle} ${typeStyles[notification.type]}`}>
                        {notification.text}
                    </div>
                )}
                <main className = "grow bg-[#EFEBCE]"><Outlet /></main>
            <Footer />
        </div>
    )
}

export default UserLayout