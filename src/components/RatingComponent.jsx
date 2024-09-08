import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const RatingComponent = ({ onRatingSubmit, rating }) => {
  const [currentRating, setCurrentRating] = useState(rating || 0);

  const handleStarClick = (index) => {
    setCurrentRating(index + 1);
    onRatingSubmit(index + 1);
  };

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        if (index < currentRating) {
          return (
            <FaStar
              key={index}
              className="text-yellow-500 cursor-pointer"
              onClick={() => handleStarClick(index)}
            />
          );
        } else {
          return (
            <FaRegStar
              key={index}
              className="text-gray-300 cursor-pointer"
              onClick={() => handleStarClick(index)}
            />
          );
        }
      });
  };

  return <div className="flex py-2 text-2xl">{renderStars()}</div>;
};

RatingComponent.propTypes = {
  onRatingSubmit: PropTypes.func.isRequired,
  rating: PropTypes.number,
};

export default RatingComponent;
