import { useRef } from "react"
import { BrandContext } from "../../context/adminContext"
import Togglable from "../common/Togglable"
import AdminCategoryModalForm from "./AdminCategoryModalForm"
import useNotificationStore from "../../store/notification.store"
import { useBrands, useDeleteBrand, useEditBrand } from "../../hooks/useBrand"
 
const  BrandTable = (props) => {
    const localBrandRef = useRef([])
    const notify = useNotificationStore(state => state.notify)
    const {data: brands, isLoading, isError} = useBrands()
    const edit = useEditBrand()
    const remove = useDeleteBrand()
    
    if (isLoading) return <div>Loading....</div>
    if (isError) return <div>Error</div>

    const editItem = async(id, newBrand) => {
        await edit.mutateAsync({id, newBrand}, {
            onSuccess: () => {
                notify(`${newBrand.name} has been edited`, "success")
            }, 
            onError: () => {
                notify(`${newBrand.name} has not been edited`, "error")
            }
        })
        localBrandRef.current.toggleVisibility()
    } 

    const removeItem = async(id) => {
        await remove.mutateAsync(id, {
            onSuccess: () => {
                notify("Deletion Successful", "success")
            },
            onError: () => {
                notify("Deletion Unsuccessful", "error")
            }
        })
    }

    return (
        <div className = "mt-4">
            <table className = "w-full table-fixed border-collapse border-spacing-2 border-solid border-2 text-[#090F13]">
                <thead>
                    <tr className = "border-2">
                        <th>Name</th>
                        <th>description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className = "text-center">
                    {brands.map((brand, index) => (
                        <tr key = {brand.id} className="border-2">
                            <td>{brand.name}</td>
                            <td>{brand.description}</td>
                            <td>{brand.image}</td>
                            <td className = "text-white">
                                <Togglable ref = {(e) => localBrandRef.current[index] = e} buttonLabel = "Edit" className = " border-solid border-black border-2 bg-green-900 hover:bg-green-500 w-32 rounded-xl m-2">
                                    <AdminCategoryModalForm buttonLabel = "Edit Product" id = {brand.id} name = {brand.name} description = {brand.description} image = {brand.image} handleName = {props.handleName} handleDescription = {props.handleDescription} handleImage = {props.handleImage} addItem = {editItem} onCancel = {() => localBrandRef.current[index]?.toggleVisibility()} />
                                </Togglable>
                                <button onClick = {() => removeItem(brand.id)} className = " border-solid border-black border-2 bg-red-900 hover:bg-red-500 w-32 rounded-xl mb-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BrandTable