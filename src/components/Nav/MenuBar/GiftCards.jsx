import React from 'react';
import { FaGift } from 'react-icons/fa';

const GiftCards = () => {
  return (
    <div className="p-4 text-center min-h-screen">
      <FaGift className="text-8xl mb-2 text-pink-500 mx-auto" />
      <h1 className="text-2xl font-bold mb-4">Gift Cards</h1>
      <p>Give the gift of choice! Buy, send, or manage gift cards here.</p>
    </div>
  );
};

export default GiftCards;
