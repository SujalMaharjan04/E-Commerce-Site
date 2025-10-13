const AdminProducts = () => {
    return (
        <div className = "text-[#090F13] ml-4">
                <h2 className = "text-xl font-bold ">Admin Product Page</h2>
                <div className = "flex gap-4 mt-4 text-2xl">
                    <button className = "border border-solid border-black border-2 w-48 h-14 bg-blue-900 text-white rounded-2xl hover:cursor-pointer hover:bg-blue-700 transition-all duration-150">+ Add Product</button>
                    <button className = "border border-solid border-black border-2 w-48 h-14 bg-green-900 text-white rounded-2xl hover:cursor-pointer hover:bg-green-700 transition-all duration-150">+ Add Category</button>
                    <button className = "border border-solid border-black border-2 w-48 h-14 bg-purple-900 text-white rounded-2xl hover:cursor-pointer hover:bg-purple-700 transition-all duration-150">+ Add Brand</button>
                </div>

                <div>
                    <table className = "w-full table-auto border-collapse border border-solid border-2">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Sales</th>
                                <th>Ratings</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
        </div>
    )
}


export default AdminProducts