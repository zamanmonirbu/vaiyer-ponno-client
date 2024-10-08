import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // Importing cart icon

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      {/* Cart Icon */}
      <FaShoppingCart size={80} className="text-gray-400 mb-4" />

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-600">Your Cart is Empty</h2>
      <p className="text-gray-500 mt-2">
        Looks like you haven't added anything to your cart yet.
      </p>

      {/* Button to go back to shop */}
      <button
        className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        onClick={() => (window.location.href = "/")} // You can replace this with your route
      >
        Go Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
