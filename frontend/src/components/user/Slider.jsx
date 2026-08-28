import { useState, useEffect } from "react"
import laptop from "../../assets/image/Dell.png"
import apple from "../../assets/image/Apple.png"
import {ChevronLeft, ChevronRight} from "lucide-react"

const Slider = () => {
    const [current, setCurrent] = useState(0)

    const obj = [
        {image: laptop},
        {image: apple}
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev+1) % obj.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className = "relative  w-full min-h-96 mt-8">
            <ChevronLeft className="absolute left-0 lg:top-1/2 top-1/4 text-slate-100 w-8 h-8 hover:cursor-pointer" onClick={()  => setCurrent((prev) => (prev + 1) % obj.length)} />
            <div className = "relative aspect-1920/540 m-8 h-full overflow-hidden">
                {obj.map((slide, index) => (
                    <img key = {index} src = {slide.image} loading = "lazy" className = {`absolute inset-0 object-contain  w-full h-full transition-opacity duration-700 ${index === current ? "opacity-100 z-20" : "opacity-0 z-0"} `} />
                ))}
            </div>
            <ChevronRight className = "absolute right-0 lg:top-1/2 top-1/4 text-slate-100 w-8 h-8 hover:cursor-pointer" onClick = {() => setCurrent((prev) => (prev - 1) % obj.length)} />       
        </div>
    )
}

export default Slider