import { useState } from 'react';
import logo from '../images/farmer.jpg';
import { IoSearchOutline } from 'react-icons/io5';

const NavbarLeft = () => {
    const [active, setActive] = useState(null); // State to track the active element

    const handleClick = (item) => {
        setActive(item); // Set the active item
    };

    return (
        <div className="flex items-center space-x-4">
            {/* Amazon Logo */}
            <img
                src={logo}
                alt="Amazon Logo"
                className={`h-8 rounded-md cursor-pointer ${active === 'logo' ? 'border-2 border-white' : ''}`}
                onClick={() => handleClick('logo')}
            />
            {/* Location and Search Bar */}
            <div className="flex items-center space-x-2 space-y-2">
                <div
                    className={`text-white text-sm cursor-pointer ${active === 'location' ? 'border-2 border-white p-2 rounded-md' : ''}`}
                    onClick={() => handleClick('location')}
                >
                    <p>Deliver to</p>
                    <p className="font-bold">Bangladesh</p>
                </div>
                <div
                    className={`flex ${active === 'search' ? 'border-2 border-white p-1 rounded-md' : ''}`}
                    onClick={() => handleClick('search')}
                >
                    <select className="bg-gray-200 border-none text-gray-700 p-1">
                        <option>All</option>
                        {/* Add more options here */}
                    </select>
                    <input
                        type="text"
                        placeholder="Search vaiyer-ponno"
                        className="p-3 w-80 border-collapse outline-none"
                    />
                    <button className="bg-yellow-400 p-2">
                        <IoSearchOutline />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavbarLeft;
