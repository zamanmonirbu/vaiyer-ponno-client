import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../actions/categoryActions';
import { getBanners } from '../../actions/bannerActions';

const CategoryBanner = () => {
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.banner.banners);
    const categories = useSelector((state) => state.categories.categories);
    const loading = useSelector((state) => state.categories.loading);
    const error = useSelector((state) => state.categories.error);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Default to "All"

    // Fetch categories only on initial render
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Fetch banners only on initial render
    useEffect(() => {
        dispatch(getBanners());
    }, [dispatch]);

    // Update banner image index every 2 seconds
    useEffect(() => {
        if (banners.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [banners.length]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex h-64">
            {/* Categories Section */}
            <div className="w-1/5 bg-gray-50 p-4 overflow-y-auto"> {/* Added overflow-y-auto */}
                <fieldset>
                    <legend className="text-xl font-bold mb-2 text-[#033B4C]">Categories</legend>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="all"
                                name="category"
                                value="All"
                                checked={selectedCategory === 'All'}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-4 h-4 mr-2"
                            />
                            <label htmlFor="all" className="text-lg text-[#033B4C] cursor-pointer">
                                All
                            </label>
                        </div>
                        {categories.map((category) => (
                            <div key={category._id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={category._id}
                                    name="category"
                                    value={category.category}
                                    checked={selectedCategory === category.category}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-4 h-4 mr-2"
                                />
                                <label htmlFor={category._id} className="text-lg text-[#033B4C] cursor-pointer">
                                    {category.category} {/* Ensure this is the correct property */}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>

            {/* Banner Section */}
            <div className="w-3/4">
                {banners.length > 0 && (
                    <img
                        src={banners[currentImageIndex]?.imageUrl}
                        alt="Banner"
                        className="h-full w-full object-cover"
                    />
                )}
            </div>
        </div>
    );
};

export default CategoryBanner;
