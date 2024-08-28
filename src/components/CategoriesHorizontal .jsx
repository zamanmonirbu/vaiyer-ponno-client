import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../actions/categoryActions';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import StrikeLine from './StrikeLine';
import { Link } from 'react-router-dom';

const MostLovedCategories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const loading = useSelector((state) => state.categories.loading);
    const error = useSelector((state) => state.categories.error);
    const [scrollPosition, setScrollPosition] = useState(0);
    const categoryContainerRef = useRef(null);

    // Fetch categories only on initial render
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handlePrevClick = () => {
        categoryContainerRef.current.scrollLeft -= 100;
        setScrollPosition(categoryContainerRef.current.scrollLeft - 100);
    };

    const handleNextClick = () => {
        categoryContainerRef.current.scrollLeft += 100;
        setScrollPosition(categoryContainerRef.current.scrollLeft + 100);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <StrikeLine />
            <div className="flex items-center relative">
                {/* Previous Button */}
                {scrollPosition > 0 && (
                    <FaChevronLeft
                        onClick={handlePrevClick}
                        className="text-2xl cursor-pointer hover:text-[#033B4C] hover:shadow-lg transition-all absolute left-0 z-10"
                    />
                )}

                {/* Category Buttons */}
                <div
                    ref={categoryContainerRef}
                    className="flex-1 flex space-x-3 overflow-x-auto scrollbar-hide"
                >
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="px-4 text-[#033B4C] rounded cursor-pointer hover:shadow-2xl hover:shadow-gray-400 transition-transform duration-300 ease-in-out transform hover:scale-110"
                        >
                           <Link to={`category/${category.category}`}>
                               <img
                                    src={category.imageUrl}
                                    alt={category.category}
                                    className="h-8 w-8 transition-transform duration-300 ease-in-out transform hover:scale-110 mx-auto"
                                />
                                {category.category}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Next Button */}
                {categoryContainerRef.current &&
                    categoryContainerRef.current.scrollWidth >
                        categoryContainerRef.current.clientWidth &&
                    scrollPosition <
                        categoryContainerRef.current.scrollWidth -
                            categoryContainerRef.current.clientWidth && (
                        <FaChevronRight
                            onClick={handleNextClick}
                            className="text-2xl cursor-pointer hover:text-[#033B4C] hover:shadow-lg transition-all absolute right-0 z-10"
                        />
                    )}
            </div>
        </div>
    );
};

export default MostLovedCategories;
