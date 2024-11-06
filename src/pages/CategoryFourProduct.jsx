import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategoriesWithLimitedProducts } from "../actions/categoryActions";
import { ClipLoader } from "react-spinners";
import { getIpLocation } from "../actions/IpLocation";
import { MdLocationOn } from "react-icons/md";

const CategoryFourProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { limitedCategoriesWithProducts, loading, error } = useSelector(
    (state) => state.categories
  );

  // State to hold the user latitude and longitude
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5; // Show 5 categories per slide

  useEffect(() => {
    dispatch(getCategoriesWithLimitedProducts());

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

  const handleNext = () => {
    if (
      limitedCategoriesWithProducts &&
      limitedCategoriesWithProducts.length > 0
    ) {
      const maxIndex =
        Math.ceil(limitedCategoriesWithProducts.length / itemsPerPage) - 1;
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const categoriesToDisplay = Array.isArray(limitedCategoriesWithProducts)
    ? limitedCategoriesWithProducts
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#f59e0b" size={50} />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="mx-auto px-4 overflow-hidden">
        <h3 className="font-bold mb-4 text-2xl text-center">
          <span className="text-yellow-400">Explore Categories</span> and Their
          Products
        </h3>

        {/* Category Carousel */}
        <div className="relative w-full">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-1"
          >
            &#8249;
          </button>

          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
              width: `${categoriesToDisplay.length * (100 / itemsPerPage)}%`,
            }}
          >
            {categoriesToDisplay.map((category) => (
              <div
                key={category._id}
                className="flex-shrink-0 w-full sm:w-1/5 p-2"
              >
                <p className="text-center my-4">
                  <Link
                    to={`/category/${category.name}`}
                    className="font-semibold text-xl text-green-500"
                  >
                    {category.name}
                  </Link>
                </p>
                <div className="grid grid-cols-2 gap-4 bg-slate-200 p-4 rounded-lg">
                  {category.products.slice(0, 4).map((product) => {
                    const distance = calculateDistance(
                      userLat,
                      userLng,
                      product.sellerLocation?.lat,
                      product.sellerLocation?.lng
                    );

                    return (
                      <div
                        key={product._id}
                        className="bg-white border rounded-lg p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-110 w-full"
                        onClick={() => handleProductClick(product._id)}
                      >
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className="w-32 h-40 object-content mb-4 rounded mx-auto"
                        />
                        <div className="text-md font-medium text-back">
                          {product.name.length > 15
                            ? product.name.slice(0, 20) + "..."
                            : product.name}
                        </div>

                        <div className="flex justify-between items-center text-sm text-teal-600">
                          <span>${product.unitPrice}</span>

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
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-1"
          >
            &#8250;
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryFourProduct;
