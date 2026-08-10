import Navbar from "../components/user/Navbar"
import Footer from '../components/user/Footer'
import { Outlet } from "react-router-dom"

const UserLayout = () => {
    return (
        <div className = "flex flex-col min-h-screen bg-[#EFEBCE]">
            <Navbar />
                <main className = "grow bg-[#EFEBCE]"><Outlet /></main>
            <Footer />
        </div>
    )
}

export default UserLayout