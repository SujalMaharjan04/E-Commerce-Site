
const AdminCategoryModalForm = (props) => {
    return (
        <div>
            <form className = "text-[#090F13]">
                <div className = "flex flex-col">
                    <label className = "">{props.label}Name</label>
                    <input type = "name" placeholder = "Enter Name Here" className = "border border-solid border-2 rounded-xl pl-2" />
                </div>

                <div className = "flex flex-col">
                    <label>{props.label} description</label>
                    <input type = "name" placeholder = "Enter description Here" className = "border border-solid border-2 rounded-xl pl-2"/>
                </div>
                
                <div className = "flex flex-col">
                    <label>{props.label} Image</label>
                    <input type = "file" placeholder = "Enter image Here" className = "border border-solid border-2 rounded-xl pl-2" />
                </div>
            </form>
        </div>
    )
}

export default AdminCategoryModalForm