import { useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../images/farmer.jpg';
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";


const Navbar = () => {
    const [active, setActive] = useState('');

    const handleClick = (section) => {
        setActive(section);
    };

    return (
        <div className="bg-gray-900 p-2 flex justify-between items-center">
            {/* Left Section */}
            <div className="flex items-center space-x-4 flex-1 w-4/5">
                {/* Amazon Logo */}
                {/* <img 
                    src={logo}
                    alt="Amazon Logo"
                    className="h-8 rounded-md"
                /> */}
                {/* Location and Search Bar */}
                <div className="flex items-center space-x-8 ml-4 space-y-2 w-full">
                    <div className="text-white text-sm">
                        <p>Deliver to</p>
                        <p className="font-bold">Bangladesh</p>
                    </div>
                    <div 
                        className={`flex flex-1 ml-8   ${active === 'search' ? 'border-2 border-white p-1 rounded-md' : ''}`}
                        onClick={() => handleClick('search')}
                    >
                        <select className="bg-gray-200 border-none text-gray-700 p-1">
                            <option>All</option>
                            {/* Add more options here */}
                        </select>
                        <input
                            type="text"
                            placeholder="Search vaiyer-ponno"
                            className="flex-1 p-2 w-3/5 border-none outline-none"
                        />
                        <button className="bg-yellow-400 p-2 flex items-center justify-center">
                            <IoSearchOutline className="text-3xl" /> {/* Larger search icon */}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-8 ml-8 text-white text-sm w-1/5">
                <div>
                    <Link to={'/user/profile'}>
                        <span>Hello,<br /> sign in</span>
                    </Link>
                </div>
                <div>
                    <p>Returns</p>
                    <p className="font-bold">& Orders</p>
                </div>
                <div className="flex items-center">
                <FiShoppingCart className='text-3xl'/>

                    <p className="ml-2">Cart</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
