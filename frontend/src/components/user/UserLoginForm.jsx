

const UserLoginForm = () => {
    return (
        <div>
            <form className = "text-[#090F13]">
                <div className = "flex flex-col p-4">
                    <label className = "text-xl">Username:</label>
                    <input type = "text" name = "username" className="border border-2 border-solid rounded-xl w-[75%]"/>
                </div>
                <div className = "flex flex-col p-4">
                    <label className = "text-xl">Password:</label>
                    <input type = "password" name = "password" className="border border-2 border-solid rounded-xl w-[75%]"/>
                </div>
                <div className = "p-4">
                    <button className = "border border-2 rounded-xl w-20 h-12">Log In</button>
                </div>
            </form>
        </div>
    )
}

export default UserLoginForm