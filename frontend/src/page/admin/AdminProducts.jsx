import { useState, useRef} from "react"
import AdminCategoryModalForm from "../../components/admin/AdminCategoryModalForm"
import AdminProductModalForm from "../../components/admin/AdminProductModalForm"
import Togglable from "../../components/common/Togglable"
import {BrandContext, CategoryContext, ProductContext} from '../../context/adminContext'
import ProductTable from '../../components/admin/ProductTable'
import CategoryTable from "../../components/admin/CategoryTable"
import BrandTable from "../../components/admin/BrandTable"
import { useCreateProduct} from "../../hooks/useProducts"
import useNotificationStore from "../../store/notification.store"
import { useCategories, useCreateCategory } from "../../hooks/useCategory"
import { useBrands, useCreateBrand } from "../../hooks/useBrand"


const AdminProducts = () => {
    const [selected, setSelected] = useState('Product')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [specs, setSpecs] = useState(0)
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const notify = useNotificationStore(state => state.notify)
    const insertCategory = useCreateCategory()
    const insertBrand = useCreateBrand()
    const createProduct = useCreateProduct()
    
    //Brand get
    const {data: brands, isLoading: brandLoading, isError: brandError} = useBrands()

    //Category get
    const {data: categories, isLoading: categoriesLoading, isError: categoriesError} = useCategories()

    //Ref For Different Function
    const brandToggle = useRef()
    const categoryToggle = useRef()
    const productToggle = useRef()

    if (brandLoading) return <div>Loading...</div>
    if (categoriesLoading) return <div>Loading...</div>

    if (brandError) return <div>Error</div>
    if (categoriesError) return <div>Error</div>

    

    //Set Function for useState
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
    
    const handleBrand = (event) => {
        setSelectedBrand(event.target.value)
    }
    
    const handleCategory = (event) => {
        setSelectedCategory(event.target.value)
    }
    
    const handleSpecs = (event) => {
        setSpecs(event.target.value)
    }
    
    //Function to add Category
    const addCategory = async(newCategory) => {
        categoryToggle.current.toggleVisibility()
        await insertCategory.mutateAsync(newCategory, {
            onSuccess: () => {
                notify(`${newCategory.name} has been added`,  'success')
            },
            onError: (error) => {
                notify(`${newCategory.name} has not been added`, 'error')
                console.log(error.message)
            }
        })
        setName('')
        setDescription('')
        setImage(null)
    }

    //Function to add Brand
    const addBrand = async(newBrand) => {
        brandToggle.current.toggleVisibility()

        await insertBrand.mutateAsync(newBrand, {
            onSuccess: () => {
                notify(`${newBrand.name} has been added`, 'success')
            },
            onError: () => {
                notify(`${newBrand.name} has not been added`, 'error')
            }
        })
        setName('')
        setDescription('')
        setImage('')

    }

    //Function to add Product
    const addProduct = async(event, newProduct) => {
        event.preventDefault()
        await createProduct.mutateAsync(newProduct, {
            onSuccess: () => {
                notify(`${newProduct.name} has been added`, 'success')
            },
            onError: () => {
                notify(`Product failed to be added`, 'error')
            }
        })
        productToggle.current.toggleVisibility()
            
    }
   
    return (
        <div className = "text-[#090F13] ml-4">
                <h2 className = "text-xl font-bold ">Admin Product Page</h2>
                <div className = "flex gap-4 mt-4 text-2xl">
                    <Togglable ref = {productToggle} buttonLabel = "+ Add Product" className = "border-solid border-black border-2 w-48 h-14 bg-blue-900 text-white rounded-2xl hover:cursor-pointer hover:bg-blue-700 transition-all duration-150">
                        <AdminProductModalForm buttonLabel = "+ Add Product" name = {name} description = {description} image = {image} price = {price} stock = {stock} brands = {brands} selectedBrand = {selectedBrand} categories = {categories} selectedCategory = {selectedCategory} specs = {specs} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} handlePrice = {handlePrice} handleStock = {handleStock} handleBrand = {handleBrand} handleCategory = {handleCategory} handleSpecs = {handleSpecs} addItem = {addProduct} onCancel = {() => productToggle.current.toggleVisibility()} />
                    </Togglable>
                    
                    <Togglable ref = {categoryToggle} buttonLabel = "+ Add Category" className = "border-solid border-black border-2 w-48 h-14 bg-green-900 text-white rounded-2xl hover:cursor-pointer hover:bg-green-700 transition-all duration-150">

                        <AdminCategoryModalForm label = "Category" name = {name} description = {description} image = {image} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} addItem = {addCategory} buttonLabel = "+ Add Category" onCancel = {() => categoryToggle.current.toggleVisibility()} />

                    </Togglable>

                    <Togglable ref = {brandToggle} buttonLabel = "+ Add Brand" className = "border-solid border-black border-2 w-48 h-14 bg-purple-900 text-white rounded-2xl hover:cursor-pointer hover:bg-purple-700 transition-all duration-150">
                        <AdminCategoryModalForm label = "Brand" name = {name} description = {description} image = {image} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} addItem = {addBrand} onCancel = {() => brandToggle.current.toggleVisibility()} buttonLabel = "+ Add Brand" />
                    </Togglable>
                </div>
                <div className = "flex justify-end items-start mr-4">
                    <select className = "bg-white w-24" value = {selected} onChange = {(e) => setSelected(e.target.value)}>
                        <option>Product</option>
                        <option>Category</option>
                        <option>Brand</option>
                    </select>
                </div>

                {selected === 'Product' && (
                    <ProductTable handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} handlePrice = {handlePrice} handleStock = {handleStock} handleBrand = {handleBrand} handleCategory = {handleCategory} />
                )}

                {selected === 'Category' && (
                    <CategoryTable handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} />
                )}

                {selected === 'Brand' && (
                    <BrandTable handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage}/>
                )}
        </div>
    )
}


export default AdminProducts