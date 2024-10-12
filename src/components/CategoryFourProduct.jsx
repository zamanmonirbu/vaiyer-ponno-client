import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesWithLimitedProducts } from '../actions/categoryActions';
import { Link, useNavigate } from "react-router-dom";
// import StrikeLine from './StrikeLine';
import { ClipLoader } from 'react-spinners'; // Importing ClipLoader from react-spinners

const exampleCategories = [
    // Example categories with products...
];

const CategoryFourProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { limitedCategoriesWithProducts, loading, error } = useSelector((state) => state.categories);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5; // Show 5 categories per slide

    useEffect(() => {
        dispatch(getCategoriesWithLimitedProducts());
    }, [dispatch]);

    const handleNext = () => {
        if (limitedCategoriesWithProducts) {
            const maxIndex = Math.ceil(limitedCategoriesWithProducts.length / itemsPerPage) - 1;
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
        }
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const categoriesToDisplay = limitedCategoriesWithProducts.length > 0 ? limitedCategoriesWithProducts : exampleCategories;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#f59e0b" size={50} /> {/* Spinner while loading */}
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {/* <StrikeLine /> */}
            <div className="mx-auto px-4 overflow-hidden">
                <h3 className="font-bold mb-4 text-2xl text-center">
                    <span className="text-yellow-400">Explore Categories</span> and Their Products
                </h3>

                {/* Category Carousel */}
                <div className="relative w-full">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-1"
                    >
                        &#8249;
                    </button>

                    <div
                        className="flex transition-transform duration-300"
                        style={{
                            transform: `translateX(-${currentIndex * 100 / itemsPerPage}%)`,
                            width: `${categoriesToDisplay.length * (100 / itemsPerPage)}%`, // Updated to show all categories
                        }}
                    >
                        {categoriesToDisplay.map((category) => (
                            <div key={category._id} className="flex-shrink-0 w-full sm:w-1/5 p-2"> {/* Change width to 1/5 to fit 5 categories */}
                                <p className="text-center my-4">
                                    <Link to={`/category/${category.name}`} className="font-semibold text-xl text-green-500">
                                        {category.name}
                                    </Link>
                                </p>
                                <div className="grid grid-cols-2 gap-4 bg-slate-200 p-4 rounded-lg">
                                    {category.products.slice(0, 4).map((product) => (
                                        <div
                                            key={product._id}
                                            className="bg-white border rounded-lg p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                                            onClick={() => handleProductClick(product._id)}
                                        >
                                            <img
                                                src={product.imageURL}
                                                alt={product.name}
                                                className="w-32 h-32 object-cover mb-4 rounded mx-auto"
                                            />
                                            <div className="text-md font-medium">
                                                {product.name.length > 15
                                                    ? product.name.slice(0, 20) + "..."
                                                    : product.name}
                                            </div>
                                            <div className="text-sm text-gray-600">{product.brand}</div>
                                            <div className="text-sm text-gray-800">${product.unitPrice}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-1"
                    >
                        &#8250;
                    </button>
                </div>
            </div>
        </>
    );
};

export default CategoryFourProduct;
