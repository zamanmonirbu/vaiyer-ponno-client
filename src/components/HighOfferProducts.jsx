import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsWithHighOffer } from '../actions/productActions';
import StrikeLine from './StrikeLine';

const HighOfferProducts = () => {
    const dispatch = useDispatch();
    const { highOfferProducts, loading, error } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProductsWithHighOffer());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(highOfferProducts)

    return (
        <div>
            <StrikeLine/>
            <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Products with High Offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {highOfferProducts.map(product => (
                    <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={product.imageURL} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-700 mt-2">{product.description.substring(0, 100)}...</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-500">Offer: {product.offer}%</span>
                                <span className="text-lg font-semibold text-gray-900">৳{product.unitPrice}</span>
                            </div>
                            <a href={product.video} target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-500 underline">
                                Watch Video
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        
    );
};

export default HighOfferProducts;
