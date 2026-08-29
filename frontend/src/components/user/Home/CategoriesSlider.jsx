import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"


const CategoriesSlider = ({categories}) => {
    const ITEMS_PER_VIEW = 3
    const [startIndex, setStartIndex] = useState(0)

    const maxIndex = Math.max(0, categories.length - ITEMS_PER_VIEW)

    const goPrev = () => setStartIndex((prev) => Math.max(0, prev - 1))
    const goNext = () => setStartIndex((prev) => Math.min(maxIndex, prev + 1))

    const visibleCategories = categories.slice(startIndex, startIndex + ITEMS_PER_VIEW)

    return (
        <div className = "relative w-full min-h-80">
            <ChevronLeft className=' absolute top-1/4 lg:top-1/3 text-slate-100 w-4 h-4 lg:w-8 lg:h-8 hover:cursor-pointer' onClick={() => goPrev()} />
            <div className = "flex justify-evenly items-center p-2 lg:p-4">
                {categories.length > 0
                ? visibleCategories.map((category) => (
                    <Link to = {`/products?category=${category.id}`}>
                        <div key = {category.id} className = " bg-[#1E293B] border-2 border-white w-28 h-40 lg:w-96 lg:h-64 flex flex-col justify-center items-center lg:gap-4 transition-transform duration-700 ">
                            <div>
                                <h1 className = "font-bold text-md lg:text-xl">{category.name}</h1>
                            </div>

                            <div className = "border-2 border-white w-24 h-32 lg:w-64  lg:h-48">
                                <img src = {category.img} alt = {`image of ${category.name}`} loading = "lazy" />
                            </div>
                        </div>
                    </Link>
                ))
                : (
                    <div>
                        <h2>NO Categories Available</h2>   
                    </div>
                )
                }
            </div>
            <ChevronRight className = "absolute top-1/4 lg:top-1/3 right-0 text-slate-100 w-4 h-4 lg:w-8 lg:h-8 hover:cursor-pointer" onClick={() => goNext()} />
        </div>
    )
}


export default CategoriesSlider