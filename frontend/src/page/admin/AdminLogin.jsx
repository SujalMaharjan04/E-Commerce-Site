import { Link } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"


const AdminLogin = () => {
    const {username, password, handleUserChange, handlePasswordChange, handleLogin} = useLogin('/admin/dashboard')
    return (
        <div className = "flex flex-col items-center justify-center min-h-screen bg-[#EFEBCE] text-xl text-[#090F13]">
            <form onSubmit = {handleLogin} className = "lg:border border-solid rounded-2xl shadow-xl/30 flex flex-col justify-center items-center h-80 w-80  bg-[#BFC7E2] transform -translate-y-20">
                <div className = "flex flex-col mb-8">
                    <label className = " mb-4">Username:</label>
                    <input type = "name" name = "username" value = {username} onChange={handleUserChange} placeholder = "Username" className = "border border-solid border-2 rounded-xl  lg:px-4 bg-white"/>
                </div>

                <div className = "flex flex-col mb-8">
                    <label className = "mb-4">Password:</label>
                    <input type = "password" name = "password" value = {password} onChange = {handlePasswordChange} placeholder = "Password" className = "border border-solid border-2 rounded-xl  lg:px-4 bg-white"/>
                </div>
                <button type = "submit" className = "border border-solid border-2 rounded-3xl w-24 bg-[#E09F75] h-10 font-bold">Log In</button>
            </form>

            <Link to = "/">&larr; Go to</Link>
            
        </div>
    )
}

export default AdminLogin