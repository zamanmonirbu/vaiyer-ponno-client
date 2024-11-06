import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/productActions";
import StrikeLine from "../components/Utilities/StrikeLine";
import { getIpLocation } from "../actions/IpLocation";
import { MdLocationOn } from "react-icons/md";

const LatestProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6; // Number of product boxes to show per page

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getIpLocation();
      if (location) {
        const [lat, lng] = location.split(",");
        setUserLat(parseFloat(lat));
        setUserLng(parseFloat(lng));
      } else {
        console.log("Could not fetch user location.");
      }
    };


    console.log( userLat,userLng)
    fetchLocation();
    dispatch(getProducts());
  }, [dispatch]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return 'Location unavailable';

    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1); // Returns distance in km with 1 decimal
  };

  // Pagination logic
  const paginatedProducts = products.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const handleNext = () => {
    if ((currentIndex + 1) * itemsPerPage < products.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div>
      <StrikeLine />
      <h3 className="font-bold mb-4 text-2xl text-center">
        <span className="text-yellow-400">Latest Loved </span>Product Details
      </h3>
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => {
            const distance = calculateDistance(
              userLat,
              userLng,
              product.sellerLocation?.lat,
              product.sellerLocation?.lng
            );

            return (
              <div
                key={product._id}
                className="bg-slate-200 p-4 rounded-lg transition-opacity duration-500"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="bg-white border rounded-lg p-1 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-full h-45 object-content mb-4 rounded mx-auto"
                    />
                    <div className="text-md font-medium text-gray-800">
                      {product.name.length > 15
                        ? product.name.slice(0, 20) + "..."
                        : product.name}
                    </div>

                    {/* Display product price */}
                    <div className="text-lg font-semibold text-gray-800 mt-2">
                      ${product.unitPrice}
                    </div>

                    {/* Display distance if available */}
                    {distance && (
                      <div className="text-sm text-gray-500 flex items-center justify-center space-x-2 mt-2">
                        <div className="flex items-center justify-center w-6 h-6 bg-teal-500 text-white rounded-full shadow-md">
                          <MdLocationOn className="text-lg" />
                        </div>
                        <span className="text-teal-600 font-medium">
                          {distance} km away
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handlePrev}
            className={`${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            } bg-gray-200 hover:bg-gray-300 p-2 rounded-full`}
            disabled={currentIndex === 0}
          >
            &#8249;
          </button>

          <button
            onClick={handleNext}
            className={`${
              (currentIndex + 1) * itemsPerPage >= products.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            } bg-gray-200 hover:bg-gray-300 p-2 rounded-full`}
            disabled={(currentIndex + 1) * itemsPerPage >= products.length}
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;
