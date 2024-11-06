import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductSuggestions } from '../actions/productActions';
import { IoIosSend } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";

const ProductSuggestion = () => {
    const [userRequirements, setUserRequirements] = useState('');
    const dispatch = useDispatch();
    const { loading, suggestions, error } = useSelector((state) => state.product);

    const handleSuggest = () => {
        dispatch(fetchProductSuggestions(userRequirements));
        setUserRequirements("");
    };

    return (
        <div className="flex flex-col min-h-100 bg-gray-100 p-8">
            {/* Upper partition for previous chat */}
            <div className="flex-grow w-full max-w-4xl mx-auto text-justify">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Product Suggestions</h2>
                
                {loading ? (
                    <div className="flex justify-center mt-4">
                        <ClipLoader color="#3b82f6" size={50} />
                    </div>
                ) : (
                    <>
                        {error && <p className="text-center text-red-600">{error}</p>}
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Previous Suggestions:</h3>
                        <div className="whitespace-pre-line text-gray-700 p-4 bg-white rounded-md shadow-sm">
                            {/* Remove * characters from suggestions.suggestionsText */}
                            {suggestions.suggestionsText.replace(/\*/g, '')}
                        </div>
                    </>
                )}
            </div>

            {/* Bottom input field and send icon */}
            <div className="w-full max-w-4xl mx-auto mt-6 border-t pt-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Enter your requirements"
                        value={userRequirements}
                        onChange={(e) => setUserRequirements(e.target.value)}
                        className="flex-grow p-4 mx-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSuggest}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                    >
                        <IoIosSend className="h-5 w-5 transform rotate-120" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductSuggestion;
