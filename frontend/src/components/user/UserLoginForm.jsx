import { useLogin } from "../../hooks/useLogin"
import Input from "../common/Input"
import { useErrorLines } from "../../hooks/useErrorLines"
import { LogIn } from "lucide-react"

const UserLoginForm = ({onSwitch}) => {
    const {username, password, setUsername, setPassword, handleLogin} = useLogin(false)
    const {setTouched, usernameError, passwordError} = useErrorLines(username, password)
    return (
        <div className = "p-10">
            <h2 className = "font-semibold md:text-2xl text-center">Log In</h2>
            <form onSubmit={handleLogin} className = "text-[#F8FAFC]">
                <div className = "flex flex-col p-4">
                    <Input 
                        label = "Username"
                        value = {username}
                        onChange={(value) => setUsername(value)}
                        name = "username"
                        onBlur = {() => setTouched(t => ({...t, username: true}))}
                        error = {usernameError}
                    />
                </div>
                <div className = "flex flex-col p-4">
                    <Input
                        label = "Password"
                        value = {password}
                        onChange={(value) => setPassword(value)}
                        name = "password"
                        type = "password"
                        showPasswordToggle = {true}
                        onBlur = {() => setTouched(t => ({...t, password: true}))}
                        error = {passwordError}
                    />
                </div>
                <div className = "p-4 flex justify-center">
                    <button type = "submit" className = "rounded-lg bg-linear-to-br from-green-700 to-green-500 text-white flex justify-center items-center gap-2 lg:gap-4 shadow px-2 py-2 w-[75%] lg:px-4 lg:py-2 lg:w-[30%] hover:bg-linear-to-br hover:from-green-800 hover:to-green-600 hover:cursor-pointer">
                        <LogIn className = "text-slate-100 w-6 h-8" />Log In
                    </button>
                </div>
            </form>

            <div className = "flex flex-col justify-center items-center gap-2 mt-4">
                Don't have a Account?
                <button type = "button" onClick={onSwitch} className = "hover:underline hover:cursor-pointer text-lg">Sign Up</button>
            </div>
        </div>
    )
}

export default UserLoginForm