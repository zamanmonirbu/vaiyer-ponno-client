import PropTypes from "prop-types";
import { useState } from "react";
import {
  AiOutlineDollarCircle,
  AiOutlineDown,
  AiOutlineShop,
  AiOutlineTag,
  AiOutlineUp,
  AiOutlineMessage, // Import the message icon
} from "react-icons/ai";
import {
  FaBoxOpen,
  FaCity,
  FaClipboardList,
  FaLocationArrow,
  FaStar,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CommentManager from "../../pages/CommentManager";
import StrikeLine from "../Utilities/StrikeLine";
import { useDispatch } from 'react-redux';
import { createChat } from "../../actions/chatAction";
import { useSelector } from 'react-redux';


const ProductDetails = ({
  productId,
  name,
  sellerId,
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
  const { userProfile } = useSelector((state) => state.user);


  // console.log(userProfile,product)

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  let totalPrice = Math.round(unitPrice - (unitPrice * offer) / 100);


  const handleMessageSeller = async () => {
    try {
      const senderId = userProfile?._id; // Replace with actual user ID
      const data = { senderId, receiverId: sellerId };

      
           
      // Dispatch the action to create the chat
      const res = await dispatch(createChat(data));
      // console.log(res.data)
      
      if (res.status === 200) {
        // Redirect to the newly created chat page
        navigate(`/c-s/chat/box`);
      }
     
    } catch (error) {
      console.error('Error creating chat:', error.message);
    }
  };
  return (
    <div className="p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-[#033B4C]">{name}</h1>

      <Link
        className="text-yellow-500 text-2xl mb-2 flex items-center"
        to={`/seller/${sellerId}`}
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
                  {` `} {city}
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

      <div className="flex items-center mb-4">
      
        {
        userProfile?(<button
          className="flex items-center text-blue-500"
          onClick={handleMessageSeller}
        >
          <AiOutlineMessage className="mr-2" />
          Message to Seller
        </button>):
        <div className="flex items-center">
        <Link to={'/user/login'} className="flex items-center text-[#0d9488] underline">
          <AiOutlineMessage className="mr-2" />
          <span>Login & message</span>
        </Link>
      </div>
      
        
        }
      
      </div>

      <div className="mb-4">
        {productId&&<CommentManager productId={productId} />}
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sellerId: PropTypes.string.isRequired,
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

