


const AdminLogin = ({username, password, handleUserChange, handlePasswordChange, handleLogin}) => {
    
    return (
        <div>
           
            <form onSubmit = {handleLogin} className = "lg: border border-solid flex flex-col justify-center items-center">
                <div className = "flex flex-col">
                    <label>Username:</label>
                    <input type = "name" name = "username" value = {username} onChange={handleUserChange} placeholder = "Username" className = "border border-solid border-2 rounded-md "/>
                </div>

                <div className = "flex flex-col">
                    <label>Password:</label>
                    <input type = "password" name = "password" value = {password} onChange = {handlePasswordChange} placeholder = "Password" className = "border border-solid border-2 rounded-md "/>
                </div>
                <button type = "submit" className = "border border-solid border-2 mt-4 rounded-xl w-24">Log In</button>
            </form>
            
        </div>
    )
}

export default AdminLogin