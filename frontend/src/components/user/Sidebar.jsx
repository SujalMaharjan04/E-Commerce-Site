import { useContext, useState, useEffect } from "react"
import {BrandContext} from '../../context/adminContext'
import { useQuery } from "@tanstack/react-query"
import brandService from '../../services/brand'

const Sidebar = ({searchFilter, onFilterChange}) => {
    const [brands, dispatchBrand] = useContext(BrandContext)
    const [active, setActive] = useState(false)
    

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
        <div className = "relative">
        <div className="relative z-50">
            <div className="block md:hidden mb-4">
                <button 
                    type="button" 
                    onClick={() => setActive(!active)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                >
                    {active ? 'Close Filter' : 'Filter'}
                </button>
            </div>
            
            <div className={`
                absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg p-4 z-50
                transform transition-all duration-300 ease-in-out origin-top
                ${active ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}
                md:static md:w-full md:bg-transparent md:shadow-none md:p-0 md:opacity-100 md:scale-y-100 md:translate-y-0 md:pointer-events-auto md:z-auto
                max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-visible border md:border-none border-gray-200
            `}>
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3 md:text-xl">Brand</h2>
                    <div className="flex flex-col gap-2">
                        {brands?.map(brand => (
                            <div key={brand.id} className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    value={brand.id} 
                                    checked={searchFilter.brand === brand.id} 
                                    name="brand" 
                                    onChange={() => {}} 
                                    onClick={() => onFilterChange("brand", brand.id)} 
                                    className="cursor-pointer"
                                /> 
                                <label className="cursor-pointer" onClick={() => onFilterChange("brand", brand.id)}>{brand.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div>
                    <h2 className="text-lg font-bold mb-3 md:text-xl">RAM</h2>
                    <div className="flex flex-col gap-2">
                        {[
                            { val: "4GB", label: "4GB" },
                            { val: "8GB", label: "8GB" },
                            { val: "16GB", label: "16GB" },
                            { val: "32GB", label: "32GB" },
                            { val: "64GB", label: "64GB" }
                        ].map((ram) => (
                            <div key={ram.val} className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    value={ram.val} 
                                    checked={searchFilter.ram === ram.val} 
                                    name="ram" 
                                    onChange={() => {}} 
                                    onClick={() => onFilterChange("ram", ram.val)}
                                    className="cursor-pointer"
                                /> 
                                <label className="cursor-pointer" onClick={() => onFilterChange("ram", ram.val)}>{ram.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}

export default Sidebar