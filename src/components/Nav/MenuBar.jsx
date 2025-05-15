"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiChevronDown } from "react-icons/fi"

const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="bg-gray-800 text-white w-full">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between px-4 h-10">
        <nav className="flex space-x-4 overflow-x-auto whitespace-nowrap py-2 scrollbar-hide">
          <Link to="/today-deals" className="hover:underline text-sm">
            Today's Deals
          </Link>
          <Link to="/customer-service" className="hover:underline text-sm">
            Customer Service
          </Link>
          <Link to="/registry" className="hover:underline text-sm">
            Registry
          </Link>
          <Link to="/gift-cards" className="hover:underline text-sm">
            Gift Cards
          </Link>
          <Link to="/sell" className="hover:underline text-sm">
            Sell
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between px-4 h-10">
        <button
          onClick={toggleMenu}
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span>Browse</span>
          <FiChevronDown className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-gray-700 px-4 py-2 space-y-2">
          <Link to="/today-deals" className="block py-2 hover:bg-gray-600 px-2 rounded">
            Today's Deals
          </Link>
          <Link to="/customer-service" className="block py-2 hover:bg-gray-600 px-2 rounded">
            Customer Service
          </Link>
          <Link to="/registry" className="block py-2 hover:bg-gray-600 px-2 rounded">
            Registry
          </Link>
          <Link to="/gift-cards" className="block py-2 hover:bg-gray-600 px-2 rounded">
            Gift Cards
          </Link>
          <Link to="/sell" className="block py-2 hover:bg-gray-600 px-2 rounded">
            Sell
          </Link>
        </div>
      )}
    </div>
  )
}

export default MenuBar
