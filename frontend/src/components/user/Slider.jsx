import { useState, useEffect } from "react"
import laptop from '../../assets/image/dell_computer.png'
import product from '../../assets/image/product_banner.png'

const Slider = () => {
    const [current, setCurrent] = useState(0)

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
        <div className = "relative h-36 md:h-[500px] w-full overflow-hidden text-[#090F13]">
            {obj.map((slide, index) => (
                <div key = {index} className = {`absolute inset-0 md:h-[500px] bg-cover bg-center transition-opacity duration-700 ${index === current ? "opacity-100 z-20" : "opacity-0 z-0"}`} style = {{backgroundImage: `url(${slide.image})`}}>
                    <div className = {`absolute top-2 md:top-14 ${slide.position === "left" ? "left-2 md:left-20 right-auto" : "right-2 md:right-20 left-auto"} w-[50%] md:w-[500px]`}>
                        <div className = "text-xs md:text-4xl md:leading-16">{slide.heading}</div>
                        <div className = "text-xs md:text-xl mt-2 line-clamp-2 md:mt-14">{slide.description}</div>
                        <div>
                            <button className = " border-2 border-solid rounded-xl w-[50%] md:w-full bg-[#E09F75] mt-2 md:mt-8 h-8 md:h-12 hover:bg-[#DF8E64]">View More &rarr;</button>
                        </div>
                    </div>
                </div>    
            ))}
            
        </div>
    )
}

export default Slider