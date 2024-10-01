import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import StrikeLine from '../StrikeLine';
import CommentManager from '../CommentManager';

const ProductDetails = ({
  productId,
  name,
  seller,
  description,
  unitPrice,
  offer,
  rating,
  order,
  sellerLocation,
  quantity,
  area,
  cities
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const descriptionPreview = description?.slice(0, 500);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  let totalPrice = Math.round(unitPrice - (unitPrice * offer) / 100);

  return (
    <div className="p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-[#033B4C]">{name}</h1>
      <Link className="text-green-500 text-2xl" to={`/seller/${seller}`}>
        Visit Store
      </Link>

      <div
        className={`text-lg font-bold ${
          rating >= 4 ? 'text-green-500' : 'text-yellow-500'
        }`}
      >
        Rating: {rating} ★
      </div>

      {/* <div className="text-[#033B4C]">Orders: {order}</div> */}
      <p><strong>Orders:</strong> {order}</p>

        {/* Displaying the additional fields */}
        <div className="text-gray-800 mb-4">
        <p><strong>Quantity:</strong> {quantity}</p>
        {/* <p><strong>Area:</strong> {area} sq.m</p> */}
        <p><strong>Seller Location:</strong> {sellerLocation?.city}</p>
        {cities && cities.length > 0 && (
          <div>
            <strong>Available Product On</strong>
            <ul className="list-disc list-inside">
              {cities.map((city, index) => (
                <li key={index}>{city}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <StrikeLine />
      <div>
        <span className="text-xl font-semibold">
          Price: <del>${unitPrice}</del>
        </span>
        {offer && (
          <span className="text-sm text-red-500 ml-2">Offer: {offer}%</span>
        )}
      </div>

      <div className="text-xl font-semibold">Total Price: ${totalPrice}</div>
      <StrikeLine />

      <div className="text-gray-800 mb-4">
        {isDescriptionVisible ? description : descriptionPreview}
        {description?.length > 100 && (
          <button
            className="text-blue-500 ml-2 flex items-center"
            onClick={toggleDescription}
          >
            {isExpanded ? (
              <>
                See Less <AiOutlineUp className="ml-1" />
              </>
            ) : (
              <>
                See More <AiOutlineDown className="ml-1" />
              </>
            )}
          </button>
        )}
      </div>

    

      <div className="mb-4">
        <CommentManager productId={productId} />
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  offer: PropTypes.number,
  rating: PropTypes.array,
  order: PropTypes.array,
  sellerLocation: PropTypes.shape({
    city: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  quantity: PropTypes.number.isRequired,
  area: PropTypes.number.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string),
};

export default ProductDetails;
