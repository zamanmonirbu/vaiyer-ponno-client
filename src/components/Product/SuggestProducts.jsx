import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { getSuggestedProducts } from "../../actions/productActions";
import { AiOutlineShopping } from "react-icons/ai"; // Import an icon from react-icons

const SuggestProducts = ({ id }) => {
  const dispatch = useDispatch();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    dispatch(getSuggestedProducts(id));
  }, [dispatch, id]);

  const { suggestedProducts, loading, error } = useSelector(
    (state) => state.product
  );

  const handleNextProduct = () => {
    setCurrentProductIndex(
      (prevIndex) => (prevIndex + 1) % suggestedProducts.length
    );
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex(
      (prevIndex) =>
        (prevIndex - 1 + suggestedProducts.length) % suggestedProducts.length
    );
  };

  return (
    <div className="my-8">
      <div className="w-full relative">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <PulseLoader color="#033B4C" size={15} />
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : suggestedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <AiOutlineShopping size={64} className="text-gray-500 mb-4" />
            <p className="text-gray-600 text-lg">No suggested products found</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <h3 className="font-bold text-2xl mb-4 text-center text-yellow-500">
              Suggested Products
            </h3>
            <div
              className="flex space-x-4"
              style={{
                transform: `translateX(-${currentProductIndex * 100}%)`,
                transition: "transform 0.3s ease",
              }}
            >
              {suggestedProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="bg-white border rounded-lg p-4 w-72 flex-shrink-0">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                    />
                    <div className="text-lg font-semibold mb-2">
                      {product.name.substring(0, 50)}
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-1/2">
                        <div className="text-lg font-bold line-through">
                          ${product.unitPrice}
                        </div>
                      </div>
                      <div className="text-yellow-500">★ {product.rating}</div>
                      <div className="text-sm text-gray-500 ml-2">
                        ({product.reviews || 0})
                      </div>
                    </div>
                    <span className="text-sm text-green-600">
                      $
                      {Math.round(
                        product.unitPrice -
                          product.unitPrice * (product.offer / 100)
                      )}{" "}
                      with {product.offer}% off
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Previous Button */}
            <button
              onClick={handlePrevProduct}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
            >
              &#8249; {/* Left-pointing arrow */}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextProduct}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
            >
              &#8250; {/* Right-pointing arrow */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestProducts;
