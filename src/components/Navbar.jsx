import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiMapPin } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../actions/categoryActions"; 
import { fetchLocation, getUserLocation } from "../actions/locationActions"; 
import Modal from "react-modal";
import "./Nav.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories); 
  const { cartItems } = useSelector((state) => state.cart); 
  const { userProfile } = useSelector((state) => state.user);
  const { city, road, postalCode, error } = useSelector(
    (state) => state.location
  );

  const [active, setActive] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    dispatch(fetchCategories()); 
    const userAuth = JSON.parse(localStorage.getItem("userAuth")); 
    const storedLocation = JSON.parse(localStorage.getItem("userLocation")); 
    if (userAuth) {
      dispatch(getUserLocation(userProfile?._id));
    } else if (!storedLocation && !userAuth) {
      dispatch(fetchLocation());
    }
  }, [dispatch, userProfile]);

  const handleClick = (section) => {
    setActive(section);
  };

  const handleAllClick = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="bg-gray-900 p-2 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4 flex-1 w-4/5">
        {/* Location and Search Bar */}
        <div className="flex items-center space-x-8 ml-4 space-y-2 w-full">
          <Link to={"/"}>
            <div className="text-white text-sm flex items-center">
              <FiMapPin className="text-xl" />

              {/* Show the user's city, road, and postal code */}
              <div className="ml-2">
                {error ? (
                  <p className="font-bold">{error}</p>
                ) : (
                  <div>
                    <p className="font-bold">{city || "City"}</p>
                    <p>
                      {road || "Road"}, {postalCode || "Postal Code"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Link>
          <div
            className={`flex flex-1 ml-8 ${
              active === "search" ? "border-2 border-white p-1 rounded-md" : ""
            }`}
            onClick={() => handleClick("search")}
          >
            <button
              className="bg-gray-200 text-gray-700 px-14"
              onClick={handleAllClick}
            >
              All
            </button>
            <input
              type="text"
              placeholder="Search vaiyer-ponno"
              className="flex-1 p-2 w-3/5 border-none outline-none"
            />
            <button className="bg-yellow-400 p-2 flex items-center justify-center">
              <IoSearchOutline className="text-3xl" />{" "}
              {/* Larger search icon */}
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-8 ml-8 text-white text-sm w-1/5">
        <div>
          <Link to="/user/dashboard">
            <span>
              Hello,
              <br /> sign in
            </span>
          </Link>
        </div>
        <div>
          <p>Returns</p>
          <p className="font-bold">& Orders</p>
        </div>
        {/* Cart Icon */}
        <div className="flex items-center">
          <Link to="/cart">
            <FiShoppingCart className="text-3xl" />
            <p className="ml-2">Cart ({totalItems})</p> {/* Show total items */}
          </Link>
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
          {categories?.map((category) => (
            <li
              key={category?._id}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            >
              <Link to={`/category/${category?.name}`}>{category?.name}</Link>
            </li>
          ))}
        </ul>
        <button
          onClick={closeModal}
          className="mt-4 bg-gray-800 text-white p-2 rounded-md"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Navbar;
