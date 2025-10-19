import laptop from '../../assets/image/dell_computer.png'
const Home = () => {
    return (
        <div>
            <div className = "relative bg-cover bg-center h-[500px] flex items-center justify-center text-[#090F13]" style = {{backgroundImage: `url(${laptop})`}}>
                <div className = "absolute top-8 left-10 lg:w-[45%] text-5xl leading-[1.5]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className = "absolute top-48 left-10 lg:w-[45%] text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ipsa libero cumque laborum quod. Numquam velit labore mollitia temporibus quaerat dolorum similique aspernatur aut laudantium eum necessitatibus, consequatur cumque dolor.
                </div>
                <div className = "absolute top-[350px] left-10 lg:w-[35%]">
                    <button className = " border border-solid border-2 text-center bg-[#E09F75] rounded-xl w-full h-[50px] hover:bg-[#DF7D53]">View More &rarr;</button>
                </div>
            </div>
        </div>
    )
}

export default Home