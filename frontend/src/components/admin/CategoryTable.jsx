import { useContext, useRef } from "react"
import { CategoryContext } from "../../context/adminContext"
import Togglable from "../common/Togglable"
import AdminCategoryModalForm from "./AdminCategoryModalForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import categoryService from '../../services/category'
import { NotificationContext } from "../../context/NotificationContext"
 
const  CategoryTable = (props) => {
    const [categories, setCategory] = useContext(CategoryContext)
    const localCategoryRef = useRef([])
    const query = useQueryClient()
    const [notification, dispatch] = useContext(NotificationContext)

    const edit = useMutation({
        mutationFn: ({id, newCategory}) => categoryService.edit(id, newCategory),
        onSuccess: (updatedCategory) => {
            setCategory({
                type: 'UPDATE_CATEGORY',
                payload: updatedCategory
            })
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {
                    text: `${updatedCategory.name} has been edited`, type: 'success'
                }
            })

            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000);

            query.invalidateQueries({queryKey: ['category']})
        },
        onError: () => {
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {
                    text: `Category has not been edited`, type: 'error'
                }
            })

            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000);
        }
    })

    const remove = useMutation({
        mutationFn: (id) => categoryService.deleteCategory(id),
        onSuccess: (data ,id) => {
            setCategory({
                type: "DELETE_CATEGORY",
                payload: id
            })
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {text: `Deletion Successful`, type: 'success'}
            })

            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000)
            query.invalidateQueries({queryKey: ['category']})
        },
        onError: () => {
            dispatch({
                type: 'SET_NOTIFICATION',
                text: `Deletion Unsuccessful`, type: 'error'
            })
            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000)
        }}
    )
    

    const editItem = async(id, newCategory, index) => {
        await edit.mutateAsync({id, newCategory})
        localCategoryRef.current[index].toggleVisibility()
    } 

    const removeItem = async(id) => {
        await remove.mutateAsync(id)
    }

    return (
        <div className = "mt-4">
            <table className = "w-full table-auto border-collapse border border-solid border-2 text-[#090F13]">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className = "text-center">
                    {categories.map((category, index) => (
                        <tr key = {category.id}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.image}</td>
                            <td className = "text-white">
                                <Togglable ref = {(e) => localCategoryRef.current[index] = e} buttonLabel = "Edit" className = "border border-solid border-black border-2 bg-green-900 hover:bg-green-500 w-32 rounded-xl mb-2">
                                    <AdminCategoryModalForm buttonLabel = "Edit Category" id = {category.id} name = {category.name} description = {category.description} image = {category.image} handleName = {props.handleName} handleDescription = {props.handleDescription} handleImage = {props.handleImage} addItem = {(id, newCategory) => editItem(id, newCategory, index)} onCancel = {() => localCategoryRef.current[index]?.toggleVisibility()} />
                                </Togglable>
                                <button onClick = {() => removeItem(category.id)} className = "border border-solid border-black border-2 bg-red-900 hover:bg-red-500 w-32 rounded-xl mb-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryTable