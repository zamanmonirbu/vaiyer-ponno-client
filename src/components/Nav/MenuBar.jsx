import React from 'react';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    <div className="bg-gray-800 text-white h-10 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Menu Button for small screens */}
      <button className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Links (hidden on small screens, flex on large screens) */}
      <nav className="hidden lg:flex space-x-4">
        <Link to="/today-deals" className="hover:underline">Today Deals</Link>
        <Link to="/customer-service" className="hover:underline">Customer Service</Link>
        <Link to="/registry" className="hover:underline">Registry</Link>
        <Link to="/gift-cards" className="hover:underline">Gift Cards</Link>
        <Link to="/sell" className="hover:underline">Sell</Link>
      </nav>

      {/* Dropdown menu for small screens */}
      <div className="flex lg:hidden">
        <nav className="space-x-4">
          <Link to="/today-deals" className="hover:underline">Today Deals</Link>
          <Link to="/customer-service" className="hover:underline">Customer Service</Link>
          <Link to="/registry" className="hover:underline">Registry</Link>
          <Link to="/gift-cards" className="hover:underline">Gift Cards</Link>
          <Link to="/sell" className="hover:underline">Sell</Link>
        </nav>
      </div>
    </div>
  );
};

export default MenuBar;
