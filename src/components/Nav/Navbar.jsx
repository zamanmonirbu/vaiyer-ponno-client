import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMapPin } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../actions/categoryActions";
import { fetchLocation } from "../../actions/locationActions";
import { getUserProfile } from "../../actions/userActions";
import ProductSearch from "../../pages/ProductSearch";
import "./Nav.css";
import { SiGooglegemini } from "react-icons/si";


const Navbar = () => {
  const dispatch = useDispatch();
  
  const { cartItems } = useSelector((state) => state.cart);
  const { userProfile } = useSelector((state) => state.user);

  const [active, setActive] = useState("");
  const totalItems = cartItems.length;
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const [storedLocation, setStoredLocation] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());

    const localLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (localLocation) {
      setStoredLocation(localLocation);
    } else if (!userAuth) {
      dispatch(fetchLocation());
    }

    if (userAuth) {
      dispatch(getUserProfile(userAuth?.id));
    }
  }, [dispatch]);

  const { city, road, postalCode, error } =
    storedLocation || userProfile?.location || {};

  const handleClick = (section) => {
    setActive(section);
  };

  return (
    <div className="navbar bg-gray-900 p-2 flex justify-between items-center md:flex-row flex-col">
      {/* Left Section */}
      <div className="flex items-center space-x-4 md:w-4/5 w-full mb-2 md:mb-0">
        {/* Location and Search Bar */}
        <div className="flex items-center md:space-x-8 w-full">
          <Link to={"/"}>
            <div className="text-white text-sm flex items-center">
              <FiMapPin className="text-xl hover:text-red-500" />
              <div className="ml-2 rounded-md hover:text-gray-300">
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
          <ProductSearch active={active} handleClick={handleClick} />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 md:space-x-8 text-white text-sm w-full md:w-1/5 justify-around md:justify-end">
        <div className="hover:bg-yellow-400 rounded-md hover:text-black p-1 text-center flex items-center space-x-2">
          <Link to={'/suggest/product/with/ai'} className="flex items-center">
            <SiGooglegemini className="w-6 h-6" />
            {/* <span className="ml-1">Ai</span> */}
          </Link>
        </div>
        <div className="hover:bg-yellow-400 rounded-md hover:text-black p-1 text-center">
          <Link to="/user/dashboard">
            <span className="block">
              Hello,
              <br /> 
              {userProfile ? <p>{userProfile.firstName}</p> : <p>Sign in</p>}
            </span>
          </Link>
        </div>
        <div className="hover:bg-yellow-400 rounded-md hover:text-black p-1 text-center">
          <Link to={'/user/orders/return'}>
            <p>Returns</p>
            <p className="font-bold">& Orders</p>
          </Link>
        </div>
        <div className="flex items-center hover:bg-yellow-400 rounded-md hover:text-black p-1">
          <Link to={`/user/product/cart`}>
            <FiShoppingCart className="text-xl sm:text-3xl rounded-sm transition-all duration-300 hover:text-white" />
            <p className="ml-2">Cart ({totalItems})</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
