import React from 'react';
import { MdLocalOffer } from 'react-icons/md';

const TodayDeals = () => {
  return (
    <div className="p-4 text-center min-h-screen">
      <MdLocalOffer className="text-8xl mb-2 text-yellow-500 mx-auto" />
      <h1 className="text-2xl font-bold mb-4">Today's Deals</h1>
      <p>Discover exclusive deals available today! Save big on a variety of products.</p>
    </div>
  );
};

export default TodayDeals;
