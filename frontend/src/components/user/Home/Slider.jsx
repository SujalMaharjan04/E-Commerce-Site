import { useState, useEffect } from "react"
import laptop from "../../../assets/image/Dell.png"
import apple from "../../../assets/image/Apple.png"
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
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className = "relative  w-full lg:min-h-96 mt-8 ">
            <ChevronLeft className="absolute left-0 lg:top-1/2 top-1/3 text-slate-100 w-4 h-4 lg:w-8 lg:h-8 hover:cursor-pointer" onClick={()  => setCurrent((prev) => (prev - 1 + obj.length) % obj.length)} />
            <div className = "relative aspect-1920/540 lg:aspect-1920/540 m-4 lg:mx-8 lg:mt-8 h-full overflow-hidden">
                {obj.map((slide, index) => (
                    <img key = {index} src = {slide.image} loading = "lazy" className = {`absolute inset-0 object-contain  w-full h-full transition-opacity duration-700 ${index === current ? "opacity-100 z-20" : "opacity-0 z-0"} `} />
                ))}
            </div>
            <ChevronRight className = "absolute right-0 lg:top-1/2 top-1/3 text-slate-100 w-4 h-4 lg:w-8 lg:h-8 hover:cursor-pointer" onClick = {() => setCurrent((prev) => (prev + 1) % obj.length)} />     

            <div className = " w-full flex justify-center items-center gap-2">
                {obj.map((slide, index) => (
                    <button 
                        key = {index} 
                        className = {`rounded-full border-2 border-white w-3 h-3 lg:w-4 lg:h-4 transition-colors ease-in-out ${index === current ? "bg-white" : "bg-transparent"} hover:cursor-pointer`}
                        onClick = {() => setCurrent(index)}
                        aria-label={`Go to Slide ${index + 1}`}    
                    >
                        
                    </button>
                ))}
            </div>  
        </div>
    )
}

export default Slider