import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../actions/categoryActions';
import Modal from 'react-modal'; // Import react-modal
import './Nav.css'

const Navbar = () => {
    const categories = useSelector((state) => state.categories.categories);
    const [active, setActive] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const dispatch = useDispatch();

    const handleClick = (section) => {
        setActive(section);
    };

    const handleAllClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    // Fetch categories only on initial render
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="bg-gray-900 p-2 flex justify-between items-center">
            {/* Left Section */}
            <div className="flex items-center space-x-4 flex-1 w-4/5">
                {/* Location and Search Bar */}
                <div className="flex items-center space-x-8 ml-4 space-y-2 w-full">
                    <div className="text-white text-sm flex items-center">
                        <span role="img" aria-label="Bangladesh Flag" className='text-3xl'>🇧🇩</span> {/* Bangladeshi Flag */}
                        <div className="ml-2">
                            <p>Deliver to</p>
                            <p className="font-bold">Bangladesh</p>
                        </div>
                    </div>
                    <div 
                        className={`flex flex-1 ml-8 ${active === 'search' ? 'border-2 border-white p-1 rounded-md' : ''}`}
                        onClick={() => handleClick('search')}
                    >
                        <button className="bg-gray-200 text-gray-700 px-14" onClick={handleAllClick}>
                           All
                        </button>
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

            {/* Modal */}
            <Modal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="All Categories"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2 className="text-xl font-bold mb-4">All Categories</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category._id} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                            {category.category} {/* Ensure this is the correct property */}
                        </li>
                    ))}
                </ul>
                <button onClick={closeModal} className="mt-4 bg-gray-800 text-white p-2 rounded-md">Close</button>
            </Modal>
        </div>
    );
};

export default Navbar;
