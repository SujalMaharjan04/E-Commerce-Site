import { useState, useRef, useContext, useEffect } from "react"
import AdminCategoryModalForm from "../../components/AdminCategoryModalForm"
import AdminProductModalForm from "../../components/AdminProductModalForm"
import Togglable from "../../components/Togglable"
import categoryService from '../../services/category'
import brandService from '../../services/brand'
import { useQuery } from "@tanstack/react-query"
import {BrandContext, CategoryContext} from '../../context/adminContext'

const AdminProducts = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [brands, dispatchBrand] = useContext(BrandContext)
    const [category, dispatchCategory] = useContext(CategoryContext)

    const setBrand = (brands) => {
        dispatchBrand({
            type: 'SET_BRAND',
            payload: brands
        })
    }

    const setCategory = (categories) => {
        dispatchCategory({
            type: 'SET_CATEGORY',
            payload: categories
        })
    }

    const brandToggle = useRef()
    const categoryToggle = useRef()
    const productToggle = useRef()

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleImage = (event) => {
        setImage(event.target.files[0])
    }
    
    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleStock = (event) => {
        setStock(event.target.value)
    }

    const addCategory = async(event) => {
        event.preventDefault()
        categoryToggle.current.toggleVisibility()
        const newCategory = {
            name,
            description,
            image
        }

        try {
            const category = await categoryService.create(newCategory)
            setName('')
            setDescription('')
            setImage('')
        }
        catch(error) {
            console.log(error.message)
        }
    }

    const addBrand = async(event) => {
        event.preventDefault()
        brandToggle.current.toggleVisibility()
        const newBrand = {
            name, 
            description, 
            image
        }

        try {
            const brand = await brandService.create(newBrand)
            setName('')
            setDescription('')
            setImage('')
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const brandsResult = useQuery({
        queryKey: ['brand'],
        queryFn: brandService.getAll,
    })

    const categories = useQuery({
        queryKey: ['category'],
        queryFn: categoryService.getAll,
    })

    useEffect(() => {
       if (brandsResult.data) {
        setBrand(brandsResult.data)
       }
    }, [brandsResult.data])    

    useEffect(() => {
        if (categories.data) {
            setCategory(categories.data)
        }
    }, [categories.data])

    
    return (
        <div className = "text-[#090F13] ml-4">
                <h2 className = "text-xl font-bold ">Admin Product Page</h2>
                <div className = "flex gap-4 mt-4 text-2xl">
                    <Togglable ref = {productToggle} buttonLabel = "+ Add Product" className = "border border-solid border-black border-2 w-48 h-14 bg-blue-900 text-white rounded-2xl hover:cursor-pointer hover:bg-blue-700 transition-all duration-150">
                        <AdminProductModalForm name = {name} description = {description} image = {image} price = {price} stock = {stock} brands = {brands} categories = {category} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} handlePrice = {handlePrice} handleStock = {handleStock} addItem = {addCategory} onCancel = {() => productToggle.current.toggleVisibility()} />
                    </Togglable>
                    
                    <Togglable ref = {categoryToggle} buttonLabel = "+ Add Category" className = "border border-solid border-black border-2 w-48 h-14 bg-green-900 text-white rounded-2xl hover:cursor-pointer hover:bg-green-700 transition-all duration-150">

                        <AdminCategoryModalForm label = "Category" name = {name} description = {description} image = {image} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} addItem = {addCategory} buttonLabel = "+ Add Category" onCancel = {() => categoryToggle.current.toggleVisibility()} />

                    </Togglable>

                    <Togglable ref = {brandToggle} buttonLabel = "+ Add Brand" className = "border border-solid border-black border-2 w-48 h-14 bg-purple-900 text-white rounded-2xl hover:cursor-pointer hover:bg-purple-700 transition-all duration-150">
                        <AdminCategoryModalForm label = "Brand" name = {name} description = {description} image = {image} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} addItem = {addBrand} onCancel = {() => brandToggle.current.toggleVisibility()} buttonLabel = "+ Add Brand" />
                    </Togglable>
                </div>

                <div>
                    <table className = "w-full table-auto border-collapse border border-solid border-2">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Sales</th>
                                <th>Ratings</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
        </div>
    )
}


export default AdminProducts