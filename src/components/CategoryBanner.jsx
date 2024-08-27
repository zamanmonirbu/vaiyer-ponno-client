import { useState, useEffect } from 'react';

const CategoryBanner = () => {
    const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
    const bannerImages = [
        'https://via.placeholder.com/600x300?text=Banner+1',
        'https://via.placeholder.com/600x300?text=Banner+2',
        'https://via.placeholder.com/600x300?text=Banner+3',
        'https://via.placeholder.com/600x300?text=Banner+4'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [bannerImages.length]);

    return (
        <div className="flex h-64">
            {/* Categories Section */}
            <div className="w-1/4 bg-gray-100 p-4">
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Banner Section */}
            <div className="w-3/4">
                <img
                    src={bannerImages[currentImageIndex]}
                    alt="Banner"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
};

export default CategoryBanner;
