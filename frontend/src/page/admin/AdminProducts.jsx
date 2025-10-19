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


const AdminProducts = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
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
    const localEditRef = useRef([])
    

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
        queryFn: productService.getAll
    })

    //Mutation Function for Product Add
    const addProducts = useMutation({
        mutationFn: (newProduct) => productService.create(newProduct),
        onSuccess: (updatedProduct) => {
            dispatchProducts({
                type: "ADD_PRODUCTS",
                payload: updatedProduct
            })
            query.invalidateQueries({queryKey: ['product']})
            notify({text: `${updatedProduct.name} has been edited`, type: 'success'})
        },
        onError: () => {
            notify({text: `Product can not be edited`, type: 'error'})
        }
    })

    //Mutation Function for Product Edit
    const editProduct = useMutation({
        mutationFn: ({id, newProduct}) => productService.edit(id, newProduct),
        onSuccess: (updatedProduct) => {
            dispatchProducts({
                type: "UPDATE_PRODUCTS",
                payload: {
                    id: updatedProduct.id,
                    newProduct: updatedProduct
                }
            })
            notify({text: `${updatedProduct.name} has been edited`, type: 'success'})
            query.invalidateQueries({queryKey: ['product']})
            
        },
        onError: (updateProduct) => {
            notify({text: `${updatedProduct.name} update failed`, type: 'error'})
        }
    })

    //Function to add Category
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
    const addProduct = async(event, newProduct) => {
        event.preventDefault()
        await addProducts.mutateAsync(newProduct)
        productToggle.current.toggleVisibility()
            
    }

    //Function to edit Product
    const editItem = async(id, newProduct) => {
        await editProduct.mutateAsync({id, newProduct})
        localEditRef.current.toggleVisibility()
    }

    //Mutation to delete Product
    const remove = useMutation({
        mutationFn: (id) => productService.deleteProduct(id),
        onSuccess: (id) => {
            dispatchProducts({
                type: 'DELETE_PRODUCT',
                payload: id
            })
            notify({text: `Deletion Successful`, type: 'success'})
            query.invalidateQueries({queryKey: ['product']})
        },
        onError: () => {
            notify({text: `Delete Unsuccessful`, type: 'error'})
        }
    })
   
    //Function to delete Product
    const removeProduct = async(id) => {
        if (window.confirm('Do you want to delete this product?'))  {
            await remove.mutateAsync(id)
        }
        
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
                    <Togglable ref = {productToggle} buttonLabel = "+ Add Product" className = "border border-solid border-black border-2 w-48 h-14 bg-blue-900 text-white rounded-2xl hover:cursor-pointer hover:bg-blue-700 transition-all duration-150">
                        <AdminProductModalForm buttonLabel = "+ Add Product" name = {name} description = {description} image = {image} price = {price} stock = {stock} brands = {brands} selectedBrand = {selectedBrand} categories = {category} selectedCategory = {selectedCategory} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} handlePrice = {handlePrice} handleStock = {handleStock} handleBrand = {handleBrand} handleCategory = {handleCategory} addItem = {addProduct} onCancel = {() => productToggle.current.toggleVisibility()} />
                    </Togglable>
                    
                    <Togglable ref = {categoryToggle} buttonLabel = "+ Add Category" className = "border border-solid border-black border-2 w-48 h-14 bg-green-900 text-white rounded-2xl hover:cursor-pointer hover:bg-green-700 transition-all duration-150">

                        <AdminCategoryModalForm label = "Category" name = {name} description = {description} image = {image} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} addItem = {addCategory} buttonLabel = "+ Add Category" onCancel = {() => categoryToggle.current.toggleVisibility()} />

                    </Togglable>

                    <Togglable ref = {brandToggle} buttonLabel = "+ Add Brand" className = "border border-solid border-black border-2 w-48 h-14 bg-purple-900 text-white rounded-2xl hover:cursor-pointer hover:bg-purple-700 transition-all duration-150">
                        <AdminCategoryModalForm label = "Brand" name = {name} description = {description} image = {image} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} addItem = {addBrand} onCancel = {() => brandToggle.current.toggleVisibility()} buttonLabel = "+ Add Brand" />
                    </Togglable>
                </div>

                <div className = "mt-4">
                    <table className = "w-full table-auto border-collapse border border-solid border-2 text-[#090F13]">
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
                        <tbody className = "text-center">
                            {products.map((p, index) => {
                                return (
                                <tr key = {p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.category.name}</td>
                                    <td>{p.brand.name}</td>
                                    <td>{p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>sales</td>
                                    <td>ratings</td>
                                    <td className = " text-white">
                                        <Togglable ref = {(el) => localEditRef.current[index] = el } buttonLabel = "Edit" className = "border border-solid border-black border-2 bg-green-900 hover:bg-green-500 w-32 rounded-xl mb-2">
                                            <AdminProductModalForm buttonLabel = "Edit Product" id = {p.id} name = {p.name} description = {p.description} image = {p.image} price = {p.price} stock = {p.stock} brands = {brands} selectedBrand = {p.brand.id} categories = {category} selectedCategory = {p.category.id} handleName = {handleName} handleDescription = {handleDescription} handleImage = {handleImage} handlePrice = {handlePrice} handleStock = {handleStock} handleBrand = {handleBrand} handleCategory = {handleCategory} addItem = {editItem} onCancel = {() => localEditRef.current[index]?.toggleVisibility()} />
                                        </Togglable>
                                        <button onClick = {() => removeProduct(p.id)} className = "border border-solid border-black border-2 bg-red-900 hover:bg-red-500 w-32 rounded-xl mb-2">Delete</button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}


export default AdminProducts