

const MostLovedCategories = () => {
    const categories = ['All','Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Beauty', 'Toys', 'Sports'];

    return (
        <div className="flex items-center space-x-4 py-4 px-6 ml-[10%] mr-[10%]">
            {/* Most Loved Categories Text */}
            <div className="flex-none text-lg font-semibold text-gray-800">
                Loved Categories:
            </div>

            {/* Category Buttons */}
            <div className="flex-1 flex space-x-3 overflow-x-auto">
                {categories.map((category, index) => (
                    <button 
                        key={index}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MostLovedCategories;
