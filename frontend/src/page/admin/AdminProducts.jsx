import { useState, useRef, useContext, useEffect } from "react"
import AdminCategoryModalForm from "../../components/admin/AdminCategoryModalForm"
import AdminProductModalForm from "../../components/admin/AdminProductModalForm"
import Togglable from "../../components/common/Togglable"
import categoryService from '../../services/category'
import brandService from '../../services/brand'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {BrandContext, CategoryContext, ProductContext} from '../../context/adminContext'
import {NotificationContext} from "../../context/NotificationContext"
import productService from '../../services/product'
import ProductTable from '../../components/admin/ProductTable'
import CategoryTable from "../../components/admin/CategoryTable"
import BrandTable from "../../components/admin/BrandTable"
import { useCreateProduct } from "../../hooks/useProducts"


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
    const [brands, dispatchBrand] = useContext(BrandContext)
    const [category, dispatchCategory] = useContext(CategoryContext)
    const [products, dispatchProducts] = useContext(ProductContext)
    const [notification, dispatch] = useContext(NotificationContext)
    const query = useQueryClient()
    

    //Notification dispatch function
    const notify = (message) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: message
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, 2000)
    }

    //Brand Dispatch function
    const setBrand = (brands) => {
        dispatchBrand({
            type: 'SET_BRAND',
            payload: brands
        })
    }


    //Category Dispatch Function
    const setCategory = (categories) => {
        dispatchCategory({
            type: 'SET_CATEGORY',
            payload: categories
        })
    }


    //Product Dispatch Function
    const setProducts = (products) => {
        dispatchProducts({
            type: "SET_PRODUCTS",
            payload: products
        })
    }

    //Ref For Different Function
    const brandToggle = useRef()
    const categoryToggle = useRef()
    const productToggle = useRef()
    

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


     //Query for Brand get
    const brandsResult = useQuery({
        queryKey: ['brand'],
        queryFn: brandService.getAll,
    })


    //Query for Category get
    const categories = useQuery({
        queryKey: ['category'],
        queryFn: categoryService.getAll,
    })

    //Query for Product Get
    const product = useQuery({
        queryKey: ['product'],
        queryFn: productService.getProductAdmin
    })

    //Function to add Category
    const addCategory = async(newCategory) => {
        categoryToggle.current.toggleVisibility()

        try {
            const category = await categoryService.create(newCategory)
            dispatchCategory({
                type: 'ADD_CATEGORY',
                payload: category
            })
            setName('')
            setDescription('')
            setImage(null)
            notify({text: `${category.name} has been added`, type: 'success'})
        }
        catch(error) {
            notify({text: `${category.name} has not been added`, type: 'error'})
        }
    }

    //Function to add Brand
    const addBrand = async(newBrand) => {
        brandToggle.current.toggleVisibility()

        try {
            const brand = await brandService.create(newBrand)
            dispatchBrand({
                type: 'ADD_BRAND',
                payload: brand
            })
            setName('')
            setDescription('')
            setImage('')
            notify({text: `${brand.name} has been added`, type: 'success'})
        }
        catch (error) {
            notify({text: ` has not been added`, type: 'error'})
        }
    }

    //Function to add Product
    const createProduct = useCreateProduct()
    const addProduct = async(event, newProduct) => {
        event.preventDefault()
        await createProduct.mutateAsync(newProduct, {
            onSuccess: (updatedProduct) => {
                notify({text: `${updatedProduct.name} has been added`, type: 'success'})
            },
            onError: () => {
                notify({text: `Product failed to be added`, type: 'error'})
            }
        })
        productToggle.current.toggleVisibility()
            
    }



    //Setting the brand, category and product data to state
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

    useEffect(() => {
        if (product.data) {
            setProducts(product.data)
        }
    }, [product.data])

    
    return (
        <div className = "text-[#090F13] ml-4">
                <h2 className = "text-xl font-bold ">Admin Product Page</h2>
                <div className = "flex gap-4 mt-4 text-2xl">
                    <Togglable ref = {productToggle} buttonLabel = "+ Add Product" className = "border-solid border-black border-2 w-48 h-14 bg-blue-900 text-white rounded-2xl hover:cursor-pointer hover:bg-blue-700 transition-all duration-150">
                        <AdminProductModalForm buttonLabel = "+ Add Product" name = {name} description = {description} image = {image} price = {price} stock = {stock} brands = {brands} selectedBrand = {selectedBrand} categories = {category} selectedCategory = {selectedCategory} specs = {specs} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} handlePrice = {handlePrice} handleStock = {handleStock} handleBrand = {handleBrand} handleCategory = {handleCategory} handleSpecs = {handleSpecs} addItem = {addProduct} onCancel = {() => productToggle.current.toggleVisibility()} />
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
                    <CategoryTable />
                )}

                {selected === 'Brand' && (
                    <BrandTable handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage}/>
                )}
        </div>
    )
}


export default AdminProducts