import  { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icons from react-icons
import StrikeLine from './StrikeLine';

const products = [
    // Same product data as before...
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'GROVE CO.',
        title: 'Glass Cleaner Starter Set',
        rating: 4.5,
        reviews: 89,
        subscribePrice: '$15.62',
        regularPrice: '$19.53',
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'NEW CHAPTER',
        title: 'Every Woman™\'s One Daily 40+ Multivitamin',
        rating: 4.5,
        reviews: 187,
        subscribePrice: '$20.79',
        regularPrice: '$25.99',
    },
    // Add more products here...
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        subscribePrice: '$4.63',
        regularPrice: '$5.79',
    },
  
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        subscribePrice: '$4.63',
        regularPrice: '$5.79',
    },
    {
        id: 5,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        subscribePrice: '$4.63',
        regularPrice: '$5.79',
    },
    {
        id: 6,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        subscribePrice: '$4.63',
        regularPrice: '$5.79',
    },
    {
        id: 7,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        subscribePrice: '$4.63',
        regularPrice: '$5.79',
    },
    {
        id: 8,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        subscribePrice: '$4.63',
        regularPrice: '$5.79',
    },
    {
        id: 9,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        subscribePrice: '$4.63',
        regularPrice: '$5.79',
    },
    

    // Add more products as needed...
];

const CategoryProductView = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < products.length - 2) {
            setCurrentIndex(currentIndex + 2);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 2);
        }
    };

    return (
        <div className="relative w-full">
            <StrikeLine/>
            {/* Previous Button */}
            {currentIndex > 0 && (
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow-lg"
                    onClick={handlePrevious}
                >
                    <FaArrowLeft size={20} />
                </button>
            )}

            <div className="flex overflow-hidden space-x-4 p-4">
                {products.slice(currentIndex, currentIndex + 4).map(product => (
                    <div key={product.id} className="bg-white border rounded-lg p-4 w-64 flex-shrink-0">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover mb-4" />
                        <div className="text-sm text-gray-600">{product.brand}</div>
                        <div className="text-lg font-semibold mb-2">{product.title}</div>
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-500">★ {product.rating}</span>
                            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                        </div>
                        <div className="text-sm text-green-600 mb-1">{product.subscribePrice} Subscribe and save</div>
                        <div className="text-lg font-bold">{product.regularPrice}</div>
                    </div>
                ))}
            </div>

            {/* Next Button */}
            {currentIndex < products.length - 4 && (
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow-lg"
                    onClick={handleNext}
                >
                    <FaArrowRight size={20} />
                </button>
            )}
        </div>
    );
};

export default CategoryProductView;
