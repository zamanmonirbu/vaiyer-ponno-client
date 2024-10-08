import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineShop,
  AiOutlineDollarCircle,
  AiOutlineTag,
} from "react-icons/ai";
import {
  FaBoxOpen,
  FaCity,
  FaClipboardList,
  FaStar,
  FaLocationArrow,
} from "react-icons/fa";
import StrikeLine from "../StrikeLine";
import CommentManager from "../CommentManager";

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
  cities,
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

      <Link
        className="text-yellow-500 text-2xl mb-2 flex items-center"
        to={`/seller/${seller}`}
      >
        <AiOutlineShop className="mr-2" /> Visit Store
      </Link>

      <div
        className={`text-lg font-bold flex items-center ${
          rating >= 4 ? "text-green-500" : "text-yellow-500"
        }`}
      >
        <FaStar className="mr-2" /> Rating: {rating} ★
      </div>

      <div className="text-gray-800 mb-4 flex items-center">
        <FaClipboardList className="mr-2" /> <strong>Orders:</strong> {order}
      </div>

      <div className="text-gray-800 mb-4">
        <div className="flex items-center mb-2">
          <FaBoxOpen className="mr-2" /> <strong>Quantity:</strong> {quantity}
        </div>
        <div className="flex items-center mb-2">
          <FaLocationArrow className="mr-2" /> <strong>Seller Location:</strong>{" "}
          {sellerLocation?.city}
        </div>
        {cities && cities.length > 0 && (
          <div className="flex items-start mb-2">
            <FaCity className="mr-2" />
            <div>
              <strong>Available Product On:</strong>
              {cities.map((city, index) => (
                  <span key={index}>
                    {/* <FaLocationArrow className="mr-2" /> Location icon */}
                    {` `}{city}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      <StrikeLine />
      <div className="flex items-center">
        <AiOutlineDollarCircle className="mr-2" />
        <span className="text-xl font-semibold">
          Price: <del>${unitPrice}</del>
        </span>
        {offer && (
          <span className="text-sm text-red-500 ml-2 flex items-center">
            <AiOutlineTag className="mr-1" /> Offer: {offer}%
          </span>
        )}
      </div>

      <div className="flex items-center text-xl font-semibold mt-2">
        <AiOutlineDollarCircle className="mr-2" /> Total Price: ${totalPrice}
      </div>
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
  rating: PropTypes.number,
  order: PropTypes.number,
  sellerLocation: PropTypes.shape({
    city: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  quantity: PropTypes.number.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string),
};

export default ProductDetails;
