import { useState, useEffect } from "react";
import { FaMinus, FaPlus, FaShoppingCart, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation } from "../../actions/locationActions";
import { clearCart } from "../../actions/cartActions";

// Haversine formula to calculate distance between two coordinates in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in kilometers
};

const AddToCartSection = ({
  unitPrice,
  offer,
  stock,
  sellerLocation,
  maxDistance,
  handleAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState("");
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [locationMatched, setLocationMatched] = useState(false);

  const dispatch = useDispatch();

  // Fetch userAuth from localStorage and userProfile location from the redux store
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const { userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    if (userAuth) {
      setLocationAllowed(true);
      checkLocationMatch(userProfile.location, sellerLocation);
    } else {
      const storedLocation = JSON.parse(localStorage.getItem("userLocation"));
      if (storedLocation) {
        setLocationAllowed(true);
        checkLocationMatch(storedLocation, sellerLocation); // Check location match
      }
    }
  }, [userAuth, userProfile, sellerLocation]);

  // Function to compare user's and seller's lat/lng using Haversine formula
  const checkLocationMatch = (userLocation, sellerLocation) => {
    const distance = calculateDistance(
      userLocation?.lat,
      userLocation?.lng,
      sellerLocation?.lat,
      sellerLocation?.lng
    );

    if (
      distance <= maxDistance ||
      sellerLocation.city.includes(userLocation.city)
    ) {
      setLocationMatched(true);
    } else {
      setLocationMatched(false);
    }
  };

  // Function to fetch location when user allows it (if userAuth not available)
  const handleAllowLocation = () => {
    dispatch(fetchLocation())
      .then((location) => {
        localStorage.setItem("userLocation", JSON.stringify(location));
        setLocationAllowed(true);
        checkLocationMatch(location, sellerLocation); // Check location match after fetching
      })
      .catch(() => {
        setWarning("Failed to fetch location. Please try again.");
      });
  };

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setWarning(""); 
    } else {
      setWarning(`Cannot add more than ${stock} items to the cart.`);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setWarning(""); 
    } else {
      setWarning("Quantity cannot be less than 1.");
    }
  };

  // Cancel selection
  const cancelSelection = () => {
    dispatch(clearCart());
  };

  // Calculate subtotal
  const discountedPrice = unitPrice - (unitPrice * offer) / 100;
  const subtotal = Math.ceil(discountedPrice * quantity);

  return (
    <div className="w-5/6 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 flex items-center">
        <FaShoppingCart className="mr-2" />
        Add to Cart
      </h3>

      {/* If location is not allowed */}
      {!locationAllowed ? (
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 mb-4 flex items-center justify-center"
          onClick={handleAllowLocation}
        >
          <FaMapMarkerAlt className="mr-2" />
          Allow Location to Add to Cart
        </button>
      ) : (
        <>
          {/* If location is allowed but doesn't match */}
          {!locationMatched ? (
            <p className="text-red-500 text-center mb-4">
              <FaTimes className="mr-2 inline-block" />
              Product is not available in your area. The seller is too far away.
            </p>
          ) : (
            <>
              {/* Quantity input with increase/decrease buttons */}
              <div className="mb-4 flex justify-between items-center">
                <label className="block text-gray-700 mb-2 w-1/2">Quantity:</label>
                <div className="flex items-center w-1/2">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-400 transition duration-200"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                  >
                    <FaMinus className="h-7" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2 text-center border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                    readOnly
                    style={{ width: "50%", margin: "0 4px" }}
                  />
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400 transition duration-200"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                  >
                    <FaPlus className="h-7" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="mb-4 flex justify-between items-center">
                <p className="text-lg font-semibold">Subtotal:</p>
                <p className="text-lg">${subtotal.toFixed(2)}</p>
              </div>

              {/* Warning message */}
              {warning && (
                <p className="text-red-500 text-sm mb-4 text-center">{warning}</p>
              )}

              {/* Add to Cart button */}
              <button
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 mb-4 flex items-center justify-center"
                onClick={() => {
                  if (quantity > stock) {
                    setWarning(`Cannot add more than ${stock} items.`);
                  } else if (quantity < 1) {
                    setWarning("Quantity must be at least 1.");
                  } else {
                    setWarning("");
                    handleAddToCart(quantity);
                  }
                }}
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>

              {/* Cancel button */}
              <button
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center"
                onClick={cancelSelection}
              >
                <FaTimes className="mr-2" />
                Clear Cart
              </button>
            </>
          )}
        </>
      )}

      {/* Stock message */}
      <p className="text-gray-600 mt-4 text-center">
        {stock > 0 ? `In Stock (${stock} available)` : `Out of Stock`}
      </p>
    </div>
  );
};

AddToCartSection.propTypes = {
  unitPrice: PropTypes.number.isRequired,
  offer: PropTypes.number,
  stock: PropTypes.number.isRequired,
  sellerLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  maxDistance: PropTypes.number.isRequired, // Max distance in km
  handleAddToCart: PropTypes.func.isRequired,
};

export default AddToCartSection;
