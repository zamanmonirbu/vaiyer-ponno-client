"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FiShoppingCart, FiMapPin, FiMenu } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../actions/categoryActions"
import { fetchLocation } from "../../actions/locationActions"
import { getUserProfile } from "../../actions/userActions"
import ProductSearch from "../../pages/ProductSearch"
import "./Nav.css"
import { SiGooglegemini } from "react-icons/si"

const Navbar = () => {
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)
  const { userProfile } = useSelector((state) => state.user)

  const [active, setActive] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const totalItems = cartItems.length
  const userAuth = JSON.parse(localStorage.getItem("userAuth"))
  const [storedLocation, setStoredLocation] = useState(null)

  useEffect(() => {
    dispatch(fetchCategories())

    const localLocation = JSON.parse(localStorage.getItem("userLocation"))
    if (localLocation) {
      setStoredLocation(localLocation)
    } else if (!userAuth) {
      dispatch(fetchLocation())
    }

    if (userAuth) {
      dispatch(getUserProfile(userAuth?.id))
    }
  }, [dispatch])

  const { city, road, postalCode, error } = storedLocation || userProfile?.location || {}

  const handleClick = (section) => {
    setActive(section)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="navbar bg-gray-900 p-2 sm:p-3 flex flex-col lg:flex-row justify-between items-center w-full">
      {/* Mobile Menu Button */}
      <div className="flex items-center justify-between w-full lg:hidden">
        <button onClick={toggleMobileMenu} className="text-white p-2" aria-label="Toggle mobile menu">
          <FiMenu size={24} />
        </button>

        {/* Logo/Home Link for Mobile */}
        <Link to="/" className="text-white font-bold text-xl">
          Vaiyer Ponno
        </Link>

        {/* Cart Icon for Mobile */}
        <Link to={`/user/product/cart`} className="text-white p-2 relative">
          <FiShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${mobileMenuOpen ? "flex" : "hidden"} lg:hidden flex-col w-full bg-gray-800 mt-2 p-4 rounded-md space-y-4`}
      >
        <Link to={"/user/dashboard"} className="text-white hover:bg-gray-700 p-2 rounded flex items-center">
          <span>Hello, {userProfile ? userProfile.firstName : "Sign in"}</span>
        </Link>

        <Link to={"/user/orders/return"} className="text-white hover:bg-gray-700 p-2 rounded">
          Returns & Orders
        </Link>

        <Link to={"/suggest/product/with/ai"} className="text-white hover:bg-gray-700 p-2 rounded flex items-center">
          <SiGooglegemini className="w-5 h-5 mr-2" />
          <span>AI Suggestions</span>
        </Link>

        <div className="flex items-center text-white">
          <FiMapPin className="text-xl mr-2" />
          <div>
            {error ? (
              <p className="font-bold">{error}</p>
            ) : (
              <div>
                <p className="font-bold">{city || "City"}</p>
                <p className="text-sm">
                  {road || "Road"}, {postalCode || "Postal Code"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center space-x-4 w-1/4">
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
      </div>

      {/* Search Bar - Always visible but full width on mobile */}
      <div className="w-full lg:w-2/4 my-2 lg:my-0">
        <ProductSearch active={active} handleClick={handleClick} />
      </div>

      {/* Right Section - Hidden on mobile */}
      <div className="hidden lg:flex items-center space-x-4 text-white text-sm w-1/4 justify-end">
        <div className="hover:bg-yellow-400 rounded-md hover:text-black p-1 text-center flex items-center">
          <Link to={"/suggest/product/with/ai"} className="flex items-center">
            <SiGooglegemini className="w-6 h-6" />
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
          <Link to={"/user/orders/return"}>
            <p>Returns</p>
            <p className="font-bold">& Orders</p>
          </Link>
        </div>
        <div className="flex items-center hover:bg-yellow-400 rounded-md hover:text-black p-1 relative">
          <Link to={`/user/product/cart`} className="flex items-center">
            <FiShoppingCart className="text-xl sm:text-2xl" />
            <p className="ml-2">Cart ({totalItems})</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
