
const UserDetails = () => {
    return (
        <div className="border p-4 space-y-4">
            {/* Top Section */}
            <div className="flex">
                {/* Left Side: Image */}
                <div className="w-1/2">
                    <img 
                        src="https://via.placeholder.com/150" 
                        alt="User Profile" 
                        className="rounded-lg w-full h-full object-cover"
                    />
                </div>
                {/* Right Side: Rating, Orders, and Contact Button */}
                <div className="w-1/2 flex flex-col justify-between pl-4">
                    <div>
                        <p className="text-xl font-bold">4.9 ★</p>
                        <p className="text-gray-500">(200 Orders Completed)</p>
                    </div>
                    <button className="mt-4 p-2 bg-blue-500 text-white rounded-md">
                        Contact
                    </button>
                </div>
            </div>

            {/* Strike Line */}
            <hr className="border-t-2 border-gray-300" />

            {/* User Information */}
            <div className="space-y-2">
                <p className="text-lg font-bold">Name: John Doe</p>
                <p className="text-gray-700">Address: 123 Main St, Springfield, IL</p>
                <p className="text-gray-700">Mobile: +1 234 567 890</p>
                <p className="text-gray-700">Bank Account: 123456789</p>
            </div>
        </div>
    );
};

export default UserDetails;
