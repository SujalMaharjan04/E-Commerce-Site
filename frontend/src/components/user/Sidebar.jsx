import { useContext, useState, useEffect } from "react"
import {BrandContext} from '../../context/adminContext'
import { useQuery } from "@tanstack/react-query"
import brandService from '../../services/brand'

const Sidebar = ({searchFilter, onFilterChange}) => {
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
                            <input  type = "radio" value = {brand.id} checked = {searchFilter.brand === brand.id} name = "brand" onChange = {() => {}} onClick = {() => onFilterChange("brand", brand.id )} /> {brand.name}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className = "text-xl">RAM</h2>
                <div className = "md:flex md:flex-col">
                    <div>
                        <input type = "radio" value = "4GB" checked = {searchFilter.ram === "4GB"} name = "ram" onChange = {() => {}} onClick = {() => onFilterChange("ram", "4GB")} /> 4GB
                    </div>
                    <div>
                        <input type = "radio" value = "8GB" checked = {searchFilter.ram === "8GB"} name = "ram" onChange = {() => {}} onClick = {() => onFilterChange("ram", "8GB")} /> 8GB
                    </div>
                    <div>
                        <input type = "radio" value = "16GB" checked = {searchFilter.ram === "16GB"} name = "ram" onChange = {() => {}} onClick = {() => onFilterChange("ram", "16GB")} /> 16GB
                    </div>
                    <div>
                        <input type = "radio" value = "32GB" checked = {searchFilter.ram === "32GB"} name = "ram" onChange = {() => {}} onClick = {() => onFilterChange("ram", "32GB")} /> 32GB
                    </div>
                    <div>
                        <input type = "radio" value = "64GB" checked = {searchFilter.ram === "64GB"} name = "ram" onChange = {() => {}} onClick = {() => onFilterChange("ram", "64GB")} /> 64GB
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Sidebar