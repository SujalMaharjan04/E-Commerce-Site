import { useState, useEffect } from "react"

const AdminCategoryModalForm = (props) => {
    const [formData, setFormData] = useState({
        name: props.name || '',
        description: props.description || '',
        image: props.image || null
    })

    useEffect(() => {
        setFormData({
            name: props.name || '',
            description: props.description || '',
            image: props.image || null
        })
    }, [props.name, props.description, props.image])

    //Generic Change
    const handleChange = (e) => {
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
            image: formData.image,
        }

        if (props.id) {
            props.addItem(props.id, newProduct)
        } else {
            props.addItem(newProduct)
        }
    }
    
    return (
        <div>
            <form className = "text-[#090F13]" onSubmit={handleSubmit}>
                <div className = "flex flex-col">
                    <label className = "">{props.label}Name</label>
                    <input type = "text" name = "name" placeholder = "Enter Name Here" className = "border border-solid border-2 rounded-xl pl-2" value = {formData.name} onChange = {handleChange}/>
                </div>

                <div className = "flex flex-col">
                    <label>{props.label} description</label>
                    <input type = "text" name = "description" placeholder = "Enter description Here" className = "border border-solid border-2 rounded-xl pl-2" value = {formData.description} onChange = {handleChange}/>
                </div>
                
                <div className = "flex flex-col">
                    <label>{props.label} Image</label>
                    <input type = "file" name = "image" placeholder = "Enter image Here" className = "border border-solid border-2 rounded-xl pl-2" onChange={handleImage} />
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