import { useContext, useState, useEffect } from "react"
import {BrandContext} from '../../context/adminContext'
import { useQuery } from "@tanstack/react-query"
import brandService from '../../services/brand'

const Sidebar = ({selectedBrand, onBrandChange}) => {
    const [brands, dispatchBrand] = useContext(BrandContext)
    

    const result = useQuery({
        queryKey: ['brand'],
        queryFn: () => brandService.getAll()
    })

    useEffect(() => {
        dispatchBrand({
            type: "SET_BRAND",
            payload: result.data
        })
    }, [result.data])
    return (
        <div>
            <div>
                <h2 className="text-xl">Brand</h2>
                <div>
                    {brands?.map(brand => (
                        
                        <div key = {brand.id}>
                            <input  type = "radio" checked = {selectedBrand === brand.id} name = "brand" onChange = {() => onBrandChange(brand.id)} /> {brand.name}
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Sidebar