import { useState } from "react";
import UserSignUp from "./UserSignUp";
import UserLoginForm from "./UserLoginForm";

const AuthPage = () => {
    const [signUpPage, setSignUpPage] = useState(false)

    return (
        <div>
            {signUpPage ? (<UserSignUp onSwitch = {() => setSignUpPage(false)} />)
                        : (<UserLoginForm onSwitch={() => setSignUpPage(true)} />)}
        </div>
    )
}

export default AuthPage