import { Link } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"
import Input from "../../components/common/Input"
import { useErrorLines } from "../../hooks/useErrorLines"


const AdminLogin = () => {
    const {username, password, setUsername, setPassword, handleLogin} = useLogin(true)
    const {setTouched, usernameError, passwordError} = useErrorLines(username, password)
    return (
        <div className = "flex flex-col items-center justify-center min-h-screen bg-[#EFEBCE] text-xl text-[#090F13]">
            <form onSubmit = {handleLogin} className = "lg:border border-solid rounded-2xl shadow-xl/30 flex flex-col justify-center items-center h-80 w-80  bg-[#BFC7E2] transform -translate-y-20">
                <div className = "flex flex-col mb-8">
                    <Input 
                        label = "Username"
                        value = {username}
                        onChange = {(v) => setUsername(v)}
                        name = "username"
                        onBlur = {() => setTouched(t => ({...t, username: true}))}
                        error = {usernameError}
                    />
                </div>

                <div className = "flex flex-col mb-8">
                    <Input 
                        label = "Password"
                        value = {password}
                        onChange = {(v) => setPassword(v)}
                        name = "password"
                        type = "password"
                        showPasswordToggle = {true}
                        onBlur = {() => setTouched(t => ({...t, password: true}))}
                        error = {passwordError}
                    />
                </div>
                <button type = "submit" className = " border-solid border-2 rounded-3xl w-24 bg-[#E09F75] h-10 font-bold">Log In</button>
            </form>

            <Link to = "/">&larr; Go to</Link>
            
        </div>
    )
}

export default AdminLogin