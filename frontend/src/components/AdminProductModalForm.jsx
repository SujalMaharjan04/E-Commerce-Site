import categoryService from '../services/category'

const AdminProductModalForm = () => {
    const categories = categoryService.getAll()
    console.log(categories)

    return (
        <div>
            <form className = "text-[#090F13]">
                <div className = "flex flex-col">
                    <label className = "">Product Name</label>
                    <input type = "name" placeholder = "Enter Name Here" className = "border border-solid border-2 rounded-xl pl-2" />
                </div>
                <div className = "flex flex-col">
                    <label>Product description</label>
                    <input type = "name" placeholder = "Enter description Here" className = "border border-solid border-2 rounded-xl pl-2"/>
                </div>
                <div className = "flex flex-col">
                    <label>Price</label>
                    <input type = "number" placeholder = "Enter Price Here" className = "border border-solid border-2 rounded-xl pl-2"/>
                </div>
                <div className = "flex flex-col">
                    <label>Stock</label>
                    <input type = "number" placeholder = "Enter Stock Here" className = "border border-solid border-2 rounded-xl pl-2"/>
                </div>
                
                <div className = "flex flex-col">
                    <label>Product Image</label>
                    <input type = "file" placeholder = "Enter image Here" className = "border border-solid border-2 rounded-xl pl-2" />
                </div>
            </form>
        </div>
    )
}

export default AdminProductModalForm