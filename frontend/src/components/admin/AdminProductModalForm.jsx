import { useState, useEffect } from "react"


const AdminProductModalForm = (props) => {
    const [formData, setFormData] = useState({
        name: props.name || '',
        description: props.description || '',
        price: props.price || '',
        stock: props.stock || '',
        selectedBrand: props.selectedBrand || '',
        selectedCategory: props.selectedCategory || '',
        image: props.image || null
    })

    useEffect(() => {
        setFormData({
            name: props.name || '',
            description: props.description || '',
            price: props.price || '',
            stock: props.stock || '',
            selectedBrand: props.selectedBrand || '',
            selectedCategory: props.selectedCategory || '',
            image: props.image || null
        })
    }, [props.name, props.description, props.price, props.stock, props.selectedBrand, props.selectedCategory, props.image])

    //Generic Change
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    //Select Change
    const handleSelectChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    //Image Change
    const handleImage = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }))
    }

    //Submit Function
    const handleSubmit = (event) => {
        event.preventDefault()

        const newProduct = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            image: formData.image,
            brand: formData.selectedBrand,
            category: formData.selectedCategory,
        }

        if (props.id) {
            props.addItem(props.id, newProduct)
        } else {
            props.addItem(event, newProduct)
        }
    }
    return (
        <div>
            <form className = "text-[#090F13]" onSubmit={handleSubmit}>
                <div className = "flex flex-col">
                    <label className = "">Product Name</label>
                    <input type = "text" name = "name" placeholder = "Enter Name Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.name} onChange={handleChange} />
                </div>
                <div className = "flex flex-col">
                    <label>Product description</label>
                    <input type = "text" name = "description" placeholder = "Enter description Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.description} onChange={handleChange} />
                </div>
                <div className = "flex flex-col">
                    <label>Price</label>
                    <input type = "number" name = "price" placeholder = "Enter Price Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.price} onChange = {handleChange} />
                </div>
                <div className = "flex flex-col">
                    <label>Stock</label>
                    <input type = "number" name = "stock" placeholder = "Enter Stock Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.stock} onChange = {handleChange} />
                </div>

                <div className = "flex flex-col">
                    <label>Brand</label>
                    <select name = "selectedBrand" value = {formData.selectedBrand} onChange = {handleSelectChange} className = " border-solid border-2 rounded-xl pl-2">
                        <option>--Choose a Brand--</option>
                        {props.brands.map(brand => (
                            <option key = {brand.id} value = {brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>

                <div className = "flex flex-col">
                    <label>Category</label>
                    <select name = "selectedCategory" value = {formData.selectedCategory} onChange = {handleSelectChange} className = " border-solid border-2 rounded-xl pl-2">
                        <option>--Choose a Category--</option>
                        {props.categories.map(category => (
                            <option key = {category.id} value = {category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className = "flex flex-col">
                    <label>Product Image</label>
                    <input type = "file" name = "image" placeholder = "Enter image Here" className = " border-solid border-2 rounded-xl pl-2"  onChange = {handleImage} />
                </div>

                <div className = "flex gap-4 mt-2">
                    <button className = " border-solid border-black border-2 w-48 h-14 bg-purple-900 text-white rounded-2xl hover:cursor-pointer hover:bg-purple-700 transition-all duration-150" type = "submit">{props.buttonLabel}</button>

                    <button onClick={props.onCancel} className = " border-solid border-black border-2 w-48 h-14 bg-red-900 text-white rounded-2xl hover:cursor-pointer hover:bg-red-700 transition-all duration-150">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AdminProductModalForm