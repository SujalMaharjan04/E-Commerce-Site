import { useLogin } from "../../hooks/useLogin"
import Input from "../common/Input"

const UserLoginForm = ({onSwitch}) => {
    const {username, password, setUsername, setPassword, handleLogin} = useLogin(false)
    return (
        <div>
            <h2 className = "font-semibold text-2xl text-center">Log In</h2>
            <form onSubmit={handleLogin} className = "text-[#090F13]">
                <div className = "flex flex-col p-4">
                    <Input 
                        label = "Username"
                        value = {username}
                        onChange={(value) => setUsername(value)}
                        name = "username"
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
                    />
                </div>
                <div className = "p-4 flex justify-center">
                    <button type = "submit" className = "px-4 py-2 rounded-lg bg-green-600 text-white shadow w-[30%] hover:bg-green-700 hover:cursor-pointer">Log In</button>
                </div>
            </form>

            <div className = "flex flex-col justify-center items-center">
                Don't have a Account?
                <button type = "button" onClick={onSwitch} className = "hover:underline hover:cursor-pointer text-lg">Sign Up</button>
            </div>
        </div>
    )
}

export default UserLoginForm