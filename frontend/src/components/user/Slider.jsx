import { useState, useEffect } from "react"
import laptop from '../../assets/image/dell_computer.png'
import product from '../../assets/image/product_banner.png'
import { useNavigate } from 'react-router-dom'

const Slider = () => {
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()

    const obj = [
        {
            image: laptop,
            heading: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ipsa libero cumque laborum quod. Numquam velit labore mollitia temporibus quaerat dolorum similique aspernatur aut laudantium eum necessitatibus, consequatur cumque dolor.",
            position: "left"
            
        },
        {
            image: product,
            heading: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ipsa libero cumque laborum quod. Numquam velit labore mollitia temporibus quaerat dolorum similique aspernatur aut laudantium eum necessitatibus, consequatur cumque dolor.",
            position: "right"
            
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev+1) % obj.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className = "relative h-[500px] w-full overflow-hidden text-[#090F13]">
            {obj.map((slide, index) => (
                <div key = {index} className = {`absolute inset-0 h-[500px] bg-cover bg-center transition-opacity duration-700 ${index === current ? "opacity-100 z-20" : "opacity-0 z-0"}`} style = {{backgroundImage: `url(${slide.image})`}}>
                    <div className = {`absolute top-14 ${slide.position === "left" ? "left-20" : "right-20"}  w-[500px]`}>
                        <div className = "text-4xl leading-16">{slide.heading}</div>
                        <div className = "mt-14">{slide.description}</div>
                        <div>
                            <button className = " border-2 border-solid rounded-xl w-full bg-[#E09F75] mt-8 h-12 hover:bg-[#DF8E64]">View More &rarr;</button>
                        </div>
                    </div>
                </div>    
            ))}
            
        </div>
    )
}

export default Slider