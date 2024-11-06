import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdLocationOn } from "react-icons/md"; // Import the location icon

const CategoryProducts = ({ productsByCategoryAll, userLat, userLng }) => {
  // Function to calculate distance using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return null;

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

  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsByCategoryAll.length > 0 ? (
          productsByCategoryAll?.map((product) => {
            // Assuming product.sellerLocation has lat and lng
            const distance = calculateDistance(
              userLat,
              userLng,
              product.sellerLocation?.lat,
              product.sellerLocation?.lng
            );

            return (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-48 object-content"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name.substring(0, 20)}
                    </h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.unitPrice}
                      </span>
                    </div>
                    {/* Display the distance */}
                    {distance !== null && distance !== undefined && (
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <MdLocationOn className="text-teal-600 mr-1" />
                        <span className="text-teal-600 font-medium">
                          {distance} km away
                        </span>
                      </div>
                    )}
                    <a
                      href={product.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-4 text-blue-500 underline"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No products in this subcategory</p>
        )}
      </div>
    </div>
  );
};

CategoryProducts.propTypes = {
  productsByCategoryAll: PropTypes.array.isRequired,
  userLat: PropTypes.number.isRequired, // Add userLat prop type
  userLng: PropTypes.number.isRequired, // Add userLng prop type
};

export default CategoryProducts;
