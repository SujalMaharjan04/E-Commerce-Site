import Slider from '../../components/user/Home/Slider'
import { useCategories } from '../../hooks/useCategory'
import CategoriesSlider from '../../components/user/Home/CategoriesSlider'

const Home = () => {
    
    const {data: categories, isLoading: categoriesLoading, isError: categoriesError} = useCategories()

    if (categoriesLoading) return <div>Loading...</div>

    if (categoriesError) return <div>Error</div>

    return (
        <div>
            <div>
                <Slider />
            </div>

            {/* Shop by Categories */}
            <div className = "relative lg:w-full lg:min-h-96 mt-8 px-4 flex flex-col justify-center items-center">
                <div>
                    <h1 className = "font-bold text-lg lg:text-2xl">Shop By Categories</h1>
                </div>
                <CategoriesSlider categories = {categories} categoriesLoading = {categoriesLoading} />
            </div>
        </div>
    )
}

export default Home