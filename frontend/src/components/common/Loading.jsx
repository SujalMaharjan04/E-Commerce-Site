
const Loading = () => {
    return (
        <div className = "flex justify-center items-center gap-4">
            <div className = "h-8 w-8 border-2 animate-spin rounded-full border-emerald-600 border-t-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]">

            </div>
            <h1 className = " text-[#F8FAFC] text-2xl font-bold">Loading...</h1>
        </div>
    )
}

export default Loading