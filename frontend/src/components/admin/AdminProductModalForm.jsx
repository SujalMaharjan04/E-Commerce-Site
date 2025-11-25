import { useState, useEffect } from "react"

const AdminProductModalForm = (props) => {
    const [categoryObj, setCategoryObj] = useState(null)
    const [formData, setFormData] = useState({
        name: props.name || '',
        description: props.description || '',
        price: props.price || '',
        stock: props.stock || '',
        selectedBrand: props.selectedBrand || '',
        selectedCategory: props.selectedCategory || '',
        image: props.image || null,
        specs: props.specs || {}
    })

    useEffect(() => {
        setFormData({
            name: props.name || '',
            description: props.description || '',
            price: props.price || '',
            stock: props.stock || '',
            selectedBrand: props.selectedBrand || '',
            selectedCategory: props.selectedCategory || '',
            image: props.image || null,
            specs: props.specs || {}
        })
    }, [props.name, props.description, props.price, props.stock, props.selectedBrand, props.selectedCategory, props.image, props.specs])

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

    //Category Change
    const handleCategoryChange = (e) => {
        const categoryObj = props.categories.find(cat => cat.id === e.target.value)
        setCategoryObj(categoryObj)
        setFormData((prev) => ({
            ...prev,
            selectedCategory: e.target.value
        }))
    }

    //Image Change
    const handleImage = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }))
    }

    //Specs Change
    const handleSpecs = (key, value, isArray = false) => {
        
        setFormData((prev) => {
            const existing = prev.specs[key] || []
            return {
            ...prev,
            specs: {
                ...prev.specs,
                [key]: isArray
                        ? existing.includes(value) ? existing : [...existing, value]
                        : value
            }
        }})
    }

    //Specs Delete
    const handleSpecsDelete = (key, value) => {
        setFormData(prev => {
            if (!Array.isArray(prev.specs[key])) return prev
            return {
                ...prev,
                specs: {
                    ...prev.specs,
                    [key]: prev.specs[key].filter(v => v !== value)
                }
        }})
    }
    //Submit Function
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData.specs)
        const newProduct = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            image: formData.image,
            brand: formData.selectedBrand,
            category: formData.selectedCategory,
            specs: formData.specs
        }

        if (props.id) {
            props.addItem(props.id, newProduct)
        } else {
            props.addItem(event, newProduct)
        }
    }

    //Spec Option Config
    const specOptions = {
        Laptop: {
            ram: ["4GB", "8GB", "16GB", "32GB", "64GB"],
            storage: ["128GB", "256GB", "512GB", "1TB"],
            processor: ["i3", "i5", "i7", "Ryzen 5", "Ryzen 7"],
            gpu: ["Integrated", "RTX 3050", "RTX 4060"],
            display: ['13.6inches', '14inches', '15.7inches'],
            CPU: ['Apple M4', 'Apple M3'],
            OS: ['MAC OS', 'Windows', 'Linux'],
            colors: ['Black', 'White', 'Pink', 'Silver', 'Gray'],
            modalName: ['13-inch MacBook Air (M4, 2025)']
            
        },
        Smartphone: {
            ram: ["4GB", "6GB", "8GB", "12GB"],
            storage: ["64GB", "128GB", "256GB"],
            battery: ["4000mAh", "4500mAh", "5000mAh"],
            camera: ["12MP", "48MP", "64MP"]
        }
    }
    const multiSpecs = ['ram', 'colors', 'storage']

    return (
        <div>
            <form className = "text-[#090F13]" onSubmit={handleSubmit}>
                <div className = "grid grid-cols-2 gap-2">
                    {/*Product Name */}
                    <div className = "flex flex-col">
                        <label className = "">Product Name</label>
                        <input type = "text" name = "name" placeholder = "Enter Name Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.name} onChange={handleChange} />
                    </div>
                    {/*Product Price */}
                    <div className = "flex flex-col">
                        <label>Price</label>
                        <input type = "number" name = "price" placeholder = "Enter Price Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.price} onChange = {handleChange} />
                    </div>
                    {/*Product Stock */}
                    <div className = "flex flex-col">
                        <label>Stock</label>
                        <input type = "number" name = "stock" placeholder = "Enter Stock Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.stock} onChange = {handleChange} />
                    </div>
                    {/*Product Brand */}
                    <div className = "flex flex-col">
                        <label>Brand</label>
                        <select name = "selectedBrand" value = {formData.selectedBrand} onChange = {handleSelectChange} className = " border-solid border-2 rounded-xl pl-2">
                            <option>--Choose a Brand--</option>
                            {props.brands.map(brand => (
                                <option key = {brand.id} value = {brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    {/*Product Cateogory and specs select */}
                    <div className = "flex flex-col">
                        <label>Category</label>
                        <select name = "selectedCategory" value = {formData.selectedCategory} onChange = {handleCategoryChange} className = " border-solid border-2 rounded-xl pl-2">
                            <option>--Choose a Category--</option>
                            {props.categories.map(category => (
                                <option key = {category.id} value = {category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    {categoryObj && specOptions[categoryObj.name] && (
                        <div className = "col-span-2 grid grid-cols-2 gap-2">
                            {/* Specs Shown as per the Category */}
                            {Object.keys(specOptions[categoryObj.name]).map(key => (
                                <div key = {key} className = "flex flex-col">
                                    <label>{key}</label>
                                    {multiSpecs.includes(key) ? (
                                        <>
                                            <select value = '' onChange = {(e) => handleSpecs(key, e.target.value, true)} className = " border-solid border-2 rounded-xl pl-2">
                                                <option value = "">Select {key}</option>
                                                {specOptions[categoryObj.name][key].map((option, index) => (
                                                    <option key = {index} value = {option}>{option}</option>
                                                ))}
                                            </select>

                                            {/*Selected Specs Shown as Pills */}
                                    
                                            <div className = "flex flex-wrap gap-2 mt-1">
                                                {(formData.specs[key] || []).map((item, i) => (
                                                    <span key = {i} className = "flex items-center bg-gray-200 px-2 py-1 rounded-lg">
                                                        {item}
                                                        <button type = "button" className = "ml-2 text-red-500 font-bold" onClick = {()=> handleSpecsDelete(key, item)}>&#10005;</button>
                                                    </span>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        //Single Select
                                        <select value = {formData.specs[key]} onChange = {(e) => handleSpecs(key, e.target.value, false)} className = "border-solid border-2 rounded-xl pl-2">
                                            <option>Select {key}</option>
                                            {specOptions[categoryObj.name][key].map((option, index) => (
                                                <option key = {index} value = {option}>{option}</option>
                                            ))}
                                        </select>
                                    )}
                                    

                                    
                                    
                                </div>
                            ))}
                        </div>
                    )}
                    {/*Product Image */}
                    <div className = "flex flex-col">
                        <label>Product Image</label>
                        <input type = "file" name = "image" placeholder = "Enter image Here" className = " border-solid border-2 rounded-xl pl-2"  onChange = {handleImage} />
                    </div>
                    {/*Product Description */}
                    
                </div>
                <div className = "flex flex-col">
                    <label>Product description</label>
                    <textarea type = "text" name = "description" rows = "5" cols = "10" placeholder = "Enter description Here" className = " border-solid border-2 rounded-xl pl-2" value = {formData.description} onChange={handleChange} />
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