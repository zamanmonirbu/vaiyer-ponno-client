import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesWithLimitedProducts } from '../actions/categoryActions';
import { Link, useNavigate } from "react-router-dom";
import StrikeLine from './StrikeLine';

const LimitedProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { limitedCategoriesWithProducts, loading, error } = useSelector((state) => state.categories);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3; // Number of categories to show per slide

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <StrikeLine />
            <div className="mx-auto px-4 overflow-hidden">
                <h3 className="font-bold mb-4 text-2xl text-center">
                    <span className="text-yellow-400">Explore Categories</span> and Their Products
                </h3>
                <div className="relative w-full">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                    >
                        &#8249;
                    </button>

                    <div
                        className="flex transition-transform duration-300"
                        style={{
                            transform: `translateX(-${currentIndex * 100 / itemsPerPage}%)`, // Adjust translation for smooth scrolling
                            width: `${limitedCategoriesWithProducts?.length * (100 / itemsPerPage)}%`, // Ensure each category takes up 1/3 of width
                        }}
                    >
                        {limitedCategoriesWithProducts?.map((category) => (
                            <div key={category._id} className="flex-shrink-0 w-1/3 p-4"> {/* 1/3 width for each category */}
                                <p className="text-center my-4">
                                    <Link to={`/category/${category.name}`} className="font-semibold text-xl text-green-500">
                                        {category.name}
                                    </Link>
                                </p>
                                <div className="grid grid-cols-2 gap-4 bg-slate-200 p-4 rounded-lg">
                                    {category.products.slice(0, 4).map((product) => (
                                        <div
                                            key={product._id}
                                            className="bg-white border rounded-lg p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-110 w-72"
                                            onClick={() => handleProductClick(product._id)}
                                        >
                                            <img
                                                src={product.imageURL}
                                                alt={product.name}
                                                className="w-32 h-32 object-cover mb-4 rounded"
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
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                    >
                        &#8250;
                    </button>
                </div>
            </div>
        </>
    );
};

export default LimitedProducts;
