import { useRef } from "react"
import { CategoryContext } from "../../context/adminContext"
import Togglable from "../common/Togglable"
import AdminCategoryModalForm from "./AdminCategoryModalForm"
import useNotificationStore from "../../store/notification.store"
import { useCategories, useDeleteCategory, useEditCategory } from "../../hooks/useCategory"
 
const  CategoryTable = (props) => {
    const localCategoryRef = useRef([])
    const notify = useNotificationStore(state => state.notify)
    const {data: categories, isLoading, isError} = useCategories()
    const edit = useEditCategory()
    const remove = useDeleteCategory()

    if (isLoading) return <div>Loading....</div>
    if (isError) return <div>Error</div>

    const editItem = async(id, newCategory, index) => {
        await edit.mutateAsync({id, newCategory}, {
            onSuccess: () => {
                notify(`${newCategory.name} has been edited`), "success"
            },
            onError: () => {
                notify("Category has not been edited", "error")
            }
        })
        localCategoryRef.current[index].toggleVisibility()
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
            <table className = "w-full table-fixed border-collapse  border-solid border-2 text-[#090F13]">
                <thead>
                    <tr className = "border-2">
                        <th>Name</th>
                        <th>description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className = "text-center">
                    {categories.map((category, index) => (
                        <tr key = {category.id} className = "border-2">
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.image}</td>
                            <td className = "text-white">
                                <Togglable ref = {(e) => localCategoryRef.current[index] = e} buttonLabel = "Edit" className = " border-solid border-black border-2 bg-green-900 hover:bg-green-500 w-32 rounded-xl m-2">
                                    <AdminCategoryModalForm buttonLabel = "Edit Category" id = {category.id} name = {category.name} description = {category.description} image = {category.image} handleName = {props.handleName} handleDescription = {props.handleDescription} handleImage = {props.handleImage} addItem = {(id, newCategory) => editItem(id, newCategory, index)} onCancel = {() => localCategoryRef.current[index]?.toggleVisibility()} />
                                </Togglable>
                                <button onClick = {() => removeItem(category.id)} className = " border-solid border-black border-2 bg-red-900 hover:bg-red-500 w-32 rounded-xl mb-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryTable