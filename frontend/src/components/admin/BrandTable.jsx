import { useContext, useRef } from "react"
import { BrandContext } from "../../context/adminContext"
import Togglable from "../common/Togglable"
import AdminCategoryModalForm from "./AdminCategoryModalForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import brandService from '../../services/brand'
import { NotificationContext } from "../../context/NotificationContext"
 
const  BrandTable = (props) => {
    const [brands, setBrand] = useContext(BrandContext)
    const localBrandRef = useRef([])
    const query = useQueryClient()
    const [notification, dispatch] = useContext(NotificationContext)

    const edit = useMutation({
        mutationFn: ({id, newBrand}) => brandService.edit(id, newBrand),
        onSuccess: (updatedBrand) => {
            setBrand({
                type: 'UPDATE_BRAND',
                payload: updatedBrand
            })
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {
                    text: `${updatedBrand.name} has been edited`, type: 'success'
                }
            })

            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000);

            query.invalidateQueries({queryKey: ['brand']})
        },
        onError: (updatedBrand) => {
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {
                    text: `${updatedBrand.name} has not been edited`, type: 'error'
                }
            })

            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000);
        }
    })

    const remove = useMutation({
        mutationFn: (id) => brandService.deleteBrand(id),
        onSuccess: (id) => {
            setBrand({
                type: "DELETE_BRAND",
                payload: id
            })
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {text: `Deletion Successful`, type: 'success'}
            })

            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000)
            query.invalidateQueries({queryKey: ['brand']})
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
    

    const editItem = async(id, newBrand) => {
        await edit.mutateAsync({id, newBrand})
        localBrandRef.current.toggleVisibility()
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
                    </tr>
                </thead>
                <tbody className = "text-center">
                    {brands.map((brand, index) => (
                        <tr key = {brand.id}>
                            <td>{brand.name}</td>
                            <td>{brand.description}</td>
                            <td>{brand.image}</td>
                            <td className = "text-white">
                                <Togglable ref = {(e) => localBrandRef.current[index] = e} buttonLabel = "Edit" className = "border border-solid border-black border-2 bg-green-900 hover:bg-green-500 w-32 rounded-xl mb-2">
                                    <AdminCategoryModalForm buttonLabel = "Edit Product" id = {brand.id} name = {brand.name} description = {brand.description} image = {brand.image} handleName = {props.handleName} handleDescription = {props.handleDescription} handleImage = {props.handleImage} addItem = {editItem} onCancel = {() => localBrandRef.current[index]?.toggleVisibility()} />
                                </Togglable>
                                <button onClick = {() => removeItem(brand.id)} className = "border border-solid border-black border-2 bg-red-900 hover:bg-red-500 w-32 rounded-xl mb-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BrandTable