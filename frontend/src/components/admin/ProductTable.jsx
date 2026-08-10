import { useRef, useContext} from "react"
import Togglable from "../common/Togglable"
import AdminProductModalForm from "./AdminProductModalForm"
import { ProductContext } from "../../context/adminContext"
import { BrandContext, CategoryContext } from "../../context/adminContext"
import { useDeleteProduct, useEditProduct } from "../../hooks/useProducts"
import useNotificationStore from "../../store/notification.store"

const ProductTable = (props) => {
    const [products, dispatchProducts] = useContext(ProductContext)
    const notify = useNotificationStore(state => state.notify)
    const [brands, dispatchBrand] = useContext(BrandContext)
    const [category, dispatchCategory] = useContext(CategoryContext)
    const localEditRef = useRef([])

    //Function to edit Product
    const editProduct = useEditProduct()
    const editItem = async(id, newProduct) => {
        await editProduct.mutateAsync({id, newProduct}, {
            onSuccess: (updatedProduct) => {
                notify(`${updatedProduct.name} has been edited`, 'success')
            },
            onError: (updatedProduct) => {
                notify(`${updatedProduct.name} update failed`, 'error')
            }
        })
        
    }
   
    //Function to delete Product
    const remove = useDeleteProduct()
    const removeProduct = async(id) => {
        if (window.confirm('Do you want to delete this product?'))  {
            await remove.mutateAsync(id, {
                onSuccess: () => {
                    notify(`Deletion Successful`, 'success')
                },
                onError: () => {
                    notify(`Delete Unsuccessful`, 'error')
                }
            })
        }
        
    }
    return (
        <div className = "mt-4">
            <table className = "w-full table-fixed border-collapse  border-solid border-2 text-[#090F13]">
                <thead>
                    <tr className = "border-2">
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
                        <tr key = {p.id} className = "border-2 m-2">
                            <td>{p.name}</td>
                            <td>{p.category?.name || '-'}</td>
                            <td>{p.brand?.name || '-'}</td>
                            <td>{p.price}</td>
                            <td>{p.stock}</td>
                            <td>sales</td>
                            <td>ratings</td>
                            <td className = " text-white">
                                <Togglable ref = {(el) => localEditRef.current[index] = el } buttonLabel = "Edit" className = " border-solid border-black border-2 bg-green-900 hover:bg-green-500 w-32 rounded-xl m-2">
                                    <AdminProductModalForm buttonLabel = "Edit Product" id = {p.id} name = {p.name} description = {p.description} image = {p.image} price = {p.price} stock = {p.stock} brands = {brands} selectedBrand = {p.brand?.id || ''} categories = {category} selectedCategory = {p.category?.id || ''} handleName = {props.handleName} handleDescription = {props.handleDescription} handleImage = {props.handleImage} handlePrice = {props.handlePrice} handleStock = {props.handleStock} handleBrand = {props.handleBrand} handleCategory = {props.handleCategory} addItem = {editItem} onCancel = {() => localEditRef.current[index]?.toggleVisibility()} />
                                </Togglable>
                                <button onClick = {() => removeProduct(p.id)} className = " border-solid border-black border-2 bg-red-900 hover:bg-red-500 w-32 rounded-xl mb-2">Delete</button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable