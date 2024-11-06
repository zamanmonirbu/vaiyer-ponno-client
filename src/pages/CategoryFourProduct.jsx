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

  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Number of category boxes to show per page

  useEffect(() => {
    dispatch(getCategoriesWithLimitedProducts());

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
    fetchLocation();
  }, [dispatch]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return null;

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const categoriesToDisplay = Array.isArray(limitedCategoriesWithProducts)
    ? limitedCategoriesWithProducts
    : [];

  // Pagination logic
  const paginatedCategories = categoriesToDisplay.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const handleNext = () => {
    if ((currentIndex + 1) * itemsPerPage < categoriesToDisplay.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#f59e0b" size={50} />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto px-4">
      <h3 className="font-bold mb-4 text-2xl text-center">
        <span className="text-yellow-400">Explore Categories</span> and Their
        Products
      </h3>

      {/* Responsive grid for categories */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedCategories.map((category) => (
          <div key={category._id} className="p-4 bg-slate-200 rounded-lg">
            <p className="text-center my-4">
              <Link
                to={`/category/${category.name}`}
                className="font-semibold text-xl text-green-500"
              >
                {category.name}
              </Link>
            </p>
            <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg">
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
                    className="border rounded-lg p-1 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-105 w-full"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-full h-40 object-content mb-4 rounded mx-auto"
                    />
                    <div className="text-md font-medium text-back">
                      {product.name.length > 15
                        ? product.name.slice(0, 20) + "..."
                        : product.name}
                    </div>

                    <div className="flex justify-between items-center text-sm text-teal-600">
                      <span>${product.unitPrice}</span>

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

      {/* Next and Previous Buttons */}
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
            (currentIndex + 1) * itemsPerPage >= categoriesToDisplay.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          } bg-gray-200 hover:bg-gray-300 p-2 rounded-full`}
          disabled={(currentIndex + 1) * itemsPerPage >= categoriesToDisplay.length}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default CategoryFourProduct;
