import Laptop from '../../assets/image/dell_laptop.png'

const ReviewCard = () => {
    return (
        <div className="bg-[#BFC7E2] p-6 rounded-2xl">
            <div className="bg-[#EFEBCE] rounded-xl p-5 shadow-md">
                <div className="flex justify-center items-center mb-4">
                    <h5 className="text-xl font-semibold text-gray-800 text-center">
                        Apple 2025 MacBook Air 13-inch Laptop with M4 chip
                    </h5>
                </div>

                <div className="flex flex-col md:flex-row justify-around items-center gap-6">
                    <div className="w-full md:w-[40%] flex justify-center">
                        <img
                            src={Laptop}
                            alt="Laptop"
                            className="h-60 w-auto object-contain rounded-lg shadow-xl/50"
                        />
                    </div>

                    <div className="w-full md:w-[50%] flex flex-col justify-center">
                        <p className="text-gray-700 leading-relaxed pb-4">
                            I recently bought the Apple MacBook Air M4, and I couldn’t be happier
                            with both its performance and value. Powered by the impressive M4 chip,
                            it delivers fast speeds, smooth graphics, and enough power to handle
                            everyday tasks as well as more demanding professional applications.
                            Despite its slim and lightweight design, it feels sturdy and
                            uncompromising in quality.
                        </p>
                        <div>
                            <button>Read More ...</button>
                        </div>

                        <p className = "pt-4">Reviewed By: Ram</p>
                    </div>

                
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
