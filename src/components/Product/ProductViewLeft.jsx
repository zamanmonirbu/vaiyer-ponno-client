import { useState } from 'react';

const ProductViewLeft = () => {
    const [mainImage, setMainImage] = useState('https://via.placeholder.com/500');

    const images = [
        'https://via.placeholder.com/50',
        'https://via.placeholder.com/50/ff0000',
        'https://via.placeholder.com/50/eeeeee',
        'https://via.placeholder.com/50/0000ff',
        'https://via.placeholder.com/50/ff0000',
        // Add more image URLs as needed
    ];

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    return (
        <div className="flex w-1/2 m-auto">
            {/* Left Side: Main Image */}
            <div className="p-4 flex flex-col space-y-2">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-12 h-12 cursor-pointer"
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>
            {/* Right Side: Small Images */}

            <div className="w-1/2 p-4">
                <div className="relative">
                    <img
                        src={mainImage}
                        alt="Main Product"
                        className="w-1/2 h-auto"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition-opacity duration-300"></div>
                </div>
            </div>
            
            
        </div>
    );
};

export default ProductViewLeft;
