import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        <h2 className="text-2xl font-semibold mb-4 text-red-500">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again or contact support.
        </p>
        <Link
          to="/"
          className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
