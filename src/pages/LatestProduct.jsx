import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/productActions";
import StrikeLine from "../components/Utilities/StrikeLine";
import { getIpLocation } from "../actions/IpLocation"; // Assuming this is the correct import for your IP location action
import { MdLocationOn } from "react-icons/md"; // Import location icon

const LatestProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  // State to hold user latitude and longitude
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  useEffect(() => {
    // Fetch user location based on IP
    const fetchLocation = async () => {
      const location = await getIpLocation();
      if (location) {
        const [lat, lng] = location.split(","); // Split the location string into latitude and longitude
        setUserLat(parseFloat(lat));
        setUserLng(parseFloat(lng));
      } else {
        console.log("Could not fetch user location.");
      }
    };

    fetchLocation();
    dispatch(getProducts());
  }, [dispatch]);

  // Helper function to calculate distance
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return null; // Return null if any coordinates are missing

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1); // Return distance in km with 1 decimal
  };

  // Arrange products in a 4-column layout
  const columns = [];
  for (let i = 0; i < products.length; i += 4) {
    columns.push(products.slice(i, i + 4));
  }

  return (
    <div>
      <StrikeLine />
      <h3 className="font-bold mb-4 text-2xl text-center">
        <span className="text-yellow-400">Latest Loved </span>Product Details
      </h3>
      <div className="flex w-full flex-wrap justify-between">
        {columns?.map((column, colIndex) => (
          <div
            key={colIndex}
            className="w-1/4 px-2 mb-4 transition-opacity duration-500"
          >
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-1">
                {column.map((product) => {
                  const distance = calculateDistance(
                    userLat,
                    userLng,
                    product.sellerLocation?.lat,
                    product.sellerLocation?.lng
                  );

                  return (
                    <Link key={product._id} to={`/product/${product._id}`}>
                      <div className="bg-white border rounded-lg p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-110">
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className="w-full h-32 object-content mb-4"
                        />
                        <div className="text-sm text-gray-600">
                          {product.name.length > 15
                            ? product.name.slice(0, 20) + "..."
                            : product.name}
                        </div>
                        {/* Display distance if available */}
                        {distance && (
                          <div className="text-sm text-gray-500 flex items-center mt-2">
                            <MdLocationOn className="text-teal-600 mr-1" />
                            <span className="text-teal-600 font-medium">
                              {distance} km away
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProduct;
