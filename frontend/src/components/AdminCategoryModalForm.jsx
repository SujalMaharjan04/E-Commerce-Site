
const AdminCategoryModalForm = (props) => {
    
    return (
        <div>
            <form className = "text-[#090F13]" onSubmit={props.addItem}>
                <div className = "flex flex-col">
                    <label className = "">{props.label}Name</label>
                    <input type = "name" placeholder = "Enter Name Here" className = "border border-solid border-2 rounded-xl pl-2" value = {props.name} onChange = {props.handleName}/>
                </div>

                <div className = "flex flex-col">
                    <label>{props.label} description</label>
                    <input type = "name" placeholder = "Enter description Here" className = "border border-solid border-2 rounded-xl pl-2" value = {props.description} onChange = {props.handleDescription}/>
                </div>
                
                <div className = "flex flex-col">
                    <label>{props.label} Image</label>
                    <input type = "file" placeholder = "Enter image Here" className = "border border-solid border-2 rounded-xl pl-2" onChange={props.handleImage} />
                </div>
                <div className = "flex gap-4 mt-2">
                    <button className = "border border-solid border-black border-2 w-48 h-14 bg-purple-900 text-white rounded-2xl hover:cursor-pointer hover:bg-purple-700 transition-all duration-150" type = "submit">{props.buttonLabel}</button>

                    <button onClick={props.onCancel} className = "border border-solid border-black border-2 w-48 h-14 bg-red-900 text-white rounded-2xl hover:cursor-pointer hover:bg-red-700 transition-all duration-150">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AdminCategoryModalForm