

const AdminProductModalForm = (props) => {
    console.log(props.categories)
    return (
        <div>
            <form className = "text-[#090F13]" onSubmit={props.handleProducts}>
                <div className = "flex flex-col">
                    <label className = "">Product Name</label>
                    <input type = "name" placeholder = "Enter Name Here" className = "border border-solid border-2 rounded-xl pl-2" value = {props.name} onChange={props.handleName} />
                </div>
                <div className = "flex flex-col">
                    <label>Product description</label>
                    <input type = "name" placeholder = "Enter description Here" className = "border border-solid border-2 rounded-xl pl-2" value = {props.description} onChange={props.handleDescription} />
                </div>
                <div className = "flex flex-col">
                    <label>Price</label>
                    <input type = "number" placeholder = "Enter Price Here" className = "border border-solid border-2 rounded-xl pl-2" value = {props.price} onChange = {props.handlePrice} />
                </div>
                <div className = "flex flex-col">
                    <label>Stock</label>
                    <input type = "number" placeholder = "Enter Stock Here" className = "border border-solid border-2 rounded-xl pl-2" value = {props.stock} onChange = {props.handleStock} />
                </div>

                <div className = "flex flex-col">
                    <label>Brand</label>
                    <select  onChange = {(e) => e.target.value} className = "border border-solid border-2 rounded-xl pl-2">
                        <option>--Choose a Brand--</option>
                        {props.brands.map(brand => (
                            <option key = {brand.id} value = {brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>

                <div className = "flex flex-col">
                    <label>Category</label>
                    <select  onChange = {(e) => e.target.value} className = "border border-solid border-2 rounded-xl pl-2">
                        <option>--Choose a Category--</option>
                        {props.categories.map(category => (
                            <option key = {category.id} value = {category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className = "flex flex-col">
                    <label>Product Image</label>
                    <input type = "file" placeholder = "Enter image Here" className = "border border-solid border-2 rounded-xl pl-2"  onChange = {props.handleImage} />
                </div>

                <div className = "flex gap-4 mt-2">
                    <button className = "border border-solid border-black border-2 w-48 h-14 bg-purple-900 text-white rounded-2xl hover:cursor-pointer hover:bg-purple-700 transition-all duration-150" type = "submit">+ Add Product</button>

                    <button onClick={props.onCancel} className = "border border-solid border-black border-2 w-48 h-14 bg-red-900 text-white rounded-2xl hover:cursor-pointer hover:bg-red-700 transition-all duration-150">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AdminProductModalForm