import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import StrikeLine from "../StrikeLine";

const CategoryProductView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  // Fetch products from the Redux store
  useEffect(() => {
    dispatch(getProducts()); // Fetch products when the component mounts
  }, [dispatch]);

  // Get products from the Redux store
  const products = useSelector((state) => state.product.products);

  const handleNext = () => {
    if (currentIndex < products.length - 2) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };
  console.log(products);
  return (
    <div className="relative w-full">
      <StrikeLine />
      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow-lg"
          onClick={handlePrevious}
        >
          <FaArrowLeft size={20} />
        </button>
      )}

      <div className="flex overflow-hidden space-x-4 p-4">
        {products.slice(currentIndex, currentIndex + 4).map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg p-4 w-64 flex-shrink-0"
          >
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <div className="text-lg font-semibold mb-2">{product.name}</div>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★ {product.ratings}</span>
            </div>
            <div className="text-lg font-bold">{product.unitPrice}</div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      {currentIndex < products.length - 4 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow-lg"
          onClick={handleNext}
        >
          <FaArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

export default CategoryProductView;
