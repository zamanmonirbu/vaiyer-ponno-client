import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import the spinner component
import { getMostRatedProducts } from "../../actions/productActions";
import StrikeLine from "../Utilities/StrikeLine";

const MostRatedProducts = () => {
  const dispatch = useDispatch();
  const [startIndex, setStartIndex] = useState(0); // Starting index for products displayed

  // Fetch the most rated products from the Redux store
  useEffect(() => {
    dispatch(getMostRatedProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  // Get the most rated products from the Redux store
  const { mostRatedProducts, loading, error } = useSelector(
    (state) => state.product
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#033B4C" loading={loading} size={50} />
      </div>
    );
  if (error)
    return (
      <p className="text-center text-red-500">An error occurred: {error}</p>
    );

  // Handle next and previous product navigation
  const handleNext = () => {
    if (startIndex + 4 < mostRatedProducts.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Get the products to display
  const visibleProducts = mostRatedProducts.slice(startIndex, startIndex + 4);

  return (
    <div>
      <div className="relative">
        <StrikeLine />
        <h3 className="font-bold mb-4 text-2xl text-center">
          <span className="text-yellow-400">Most Rated </span>Product Details
        </h3>

        <div className="relative overflow-hidden">
          <div className="flex justify-between flex-wrap">
            {visibleProducts?.map((product) => (
              <div
                key={product?.product?._id}
                className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 transition-opacity duration-500"
              >
                <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                  <Link to={`/product/${product?.product?._id}`}>
                    <div className="bg-white border rounded-lg p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-105">
                      <div className="flex">
                        <div className="w-1/2 mx-auto">
                          <img
                            src={product?.product?.imageURL}
                            alt={product?.product?.name}
                            className="w-32 h-32 mx-auto object-cover mb-4"
                          />
                        </div>
                        <div className="w-1/2">
                          <span className="text-yellow-500">
                            Rating: ★ {product?.product?.rating}
                          </span>
                          <div className="text-lg font-bold">
                            Price: ${product?.product?.unitPrice}
                          </div>
                          <div className="text-lg text-green-500">
                            Offer: {product?.product?.offer}%
                          </div>
                          <div className="text-lg text-green-500">
                            <a
                              href={product?.product?.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-500 underline"
                            >
                              Watch Video
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold mb-2 text-center">
                        {product?.product?.name.substring(0, 40)}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            &#8249; {/* Unicode for a left-pointing triangle */}
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + 4 >= mostRatedProducts.length}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            &#8250; {/* Unicode for a right-pointing triangle */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MostRatedProducts;
