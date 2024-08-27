import { useState, useEffect } from 'react';

const banners = [
    'https://via.placeholder.com/600x400?text=Banner+1',
    'https://via.placeholder.com/600x400?text=Banner+2',
    'https://via.placeholder.com/600x400?text=Banner+3',
];

const products = [
    {
        id: 1,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'GROVE CO.',
        title: 'Glass Cleaner Starter Set',
        rating: 4.5,
        reviews: 89,
        discount: 20,
        regularPrice: '$19.53',
        discountedPrice: '$15.62',
    },
    {
        id: 2,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'NEW CHAPTER',
        title: 'Every Woman™\'s One Daily 40+ Multivitamin',
        rating: 4.5,
        reviews: 187,
        discount: 15,
        regularPrice: '$25.99',
        discountedPrice: '$20.79',
    },
    {
        id: 3,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'DR. TUNG\'S',
        title: 'Smart Floss®',
        rating: 4.5,
        reviews: 345,
        discount: 5, // Less than 10%, should not be shown
        regularPrice: '$5.79',
        discountedPrice: '$4.63',
    },
    {
        id: 4,
        imageUrl: 'https://via.placeholder.com/150',
        brand: 'GROVE CO.',
        title: 'Hand & Dish Soap Set',
        rating: 4.5,
        reviews: 67,
        discount: 30,
        regularPrice: '$8.53',
        discountedPrice: '$6.82',
    },
    // More products as needed...
];

const BannerAndOfferView = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [currentProduct, setCurrentProduct] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        }, 3000); // Change banner every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const handleNextBanner = () => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    };

    const handlePrevBanner = () => {
        setCurrentBanner((prevBanner) => (prevBanner - 1 + banners.length) % banners.length);
    };

    const handleNextProduct = () => {
        setCurrentProduct((prevProduct) => (prevProduct + 1) % offeredProducts.length);
    };

    const handlePrevProduct = () => {
        setCurrentProduct((prevProduct) => (prevProduct - 1 + offeredProducts.length) % offeredProducts.length);
    };

    const offeredProducts = products.filter(product => product.discount > 10);

    return (
        <div className="flex w-full p-4 space-x-4">
            {/* Left Side: Rotating Banner */}
            <div className="w-1/2 h-64 relative">
                <img
                    src={banners[currentBanner]}
                    alt={`Banner ${currentBanner + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                />
                {/* Previous Button */}
                <button
                    onClick={handlePrevBanner}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
                >
                    &#9664;
                </button>
                {/* Next Button */}
                <button
                    onClick={handleNextBanner}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
                >
                    &#9654;
                </button>
            </div>

            {/* Right Side: Offered Products */}
            <div className="w-1/2 relative">
                <div className="overflow-hidden">
                    <div
                        className="flex space-x-4"
                        style={{ transform: `translateX(-${currentProduct * 100}%)`, transition: 'transform 0.3s ease' }}
                    >
                        {offeredProducts.map(product => (
                            <div key={product.id} className="bg-white border rounded-lg p-4 w-64 flex-shrink-0">
                                <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover mb-4" />
                                <div className="text-sm text-gray-600">{product.brand}</div>
                                <div className="text-lg font-semibold mb-2">{product.title}</div>
                                <div className="flex items-center mb-2">
                                    <span className="text-yellow-500">★ {product.rating}</span>
                                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                                </div>
                                <div className="text-sm text-green-600 mb-1">{product.discountedPrice} with {product.discount}% off</div>
                                <div className="text-lg font-bold line-through">{product.regularPrice}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Previous Button */}
                <button
                    onClick={handlePrevProduct}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
                >
                    &#9664;
                </button>
                {/* Next Button */}
                <button
                    onClick={handleNextProduct}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
                >
                    &#9654;
                </button>
            </div>
        </div>
    );
};

export default BannerAndOfferView;
