import  { useState } from 'react';
import FilterComponent from './FilterComponent';
import AllNavSections from '../AllNavSections';

const ViewFilterProducts = () => {
    const [selectedCategory] = useState('Electronics'); // Example category
    const [selectedSubCategory, setSelectedSubCategory] = useState('Mobiles'); // Example sub-category

    // Example sub-categories and products (you can replace this with real data)
    const categories = {
        Electronics: ['Mobiles', 'Laptops', 'Cameras'],
        Clothing: ['Men', 'Women', 'Kids'],
    };

    const products = [
        { id: 1, title: 'Smartphone', subCategory: 'Mobiles' },
        { id: 2, title: 'Laptop', subCategory: 'Laptops' },
        { id: 3, title: 'Camera', subCategory: 'Cameras' },
        // Add more products as needed
    ];

    // Filter products based on the selected sub-category
    const filteredProducts = products.filter(product => product.subCategory === selectedSubCategory);

    return (
        <>
        <AllNavSections/>
        <div className="flex w-full p-4 space-x-4">
            {/* Left Side: Filter Section */}
            <div className="w-1/6 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold mb-4">Filter Products</h3>
                {/* Add filter options here */}
                {/* <div>Filter options will go here.</div> */}
                <FilterComponent/>
            </div>

            {/* Right Side: Main Content */}
            <div className="w-5/6">
                {/* Category Name */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold">{selectedCategory}</h2>
                    <hr className="border-t-2 border-gray-300 mt-2" />
                </div>

                {/* Sub-Category Buttons */}
                <div className="mb-4 flex space-x-2">
                    {categories[selectedCategory].map(subCategory => (
                        <button
                            key={subCategory}
                            onClick={() => setSelectedSubCategory(subCategory)}
                            className={`px-4 py-2 rounded ${subCategory === selectedSubCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {subCategory}
                        </button>
                    ))}
                </div>
                <hr className="border-t-2 border-gray-300 mb-4" />

                {/* Product Listing */}
                <div className="grid grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white border rounded-lg p-4">
                            <h4 className="font-bold">{product.title}</h4>
                            {/* Add more product details here */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
       
    );
};

export default ViewFilterProducts;
