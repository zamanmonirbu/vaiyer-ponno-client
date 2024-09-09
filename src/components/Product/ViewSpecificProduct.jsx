import { useEffect, useState } from "react";
import ProductViewLeft from "./ProductViewLeft";
import { getProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import PropTypes from "prop-types";

const ViewSpecificProduct = ({ id }) => {
  const dispatch = useDispatch();

  // Fetch product details
  const { product, loading, error } = useSelector((state) => state.product);

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // Fetch cart state from Redux to keep track of the cart count
  // const cart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(addToCart(product?._id, quantity));
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Cancel (Reset quantity)
  const cancelSelection = () => {
    setQuantity(1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Section: Images View */}
      <div className="w-1/2 bg-gray-100 p-4 rounded-lg">
        <ProductViewLeft
          mainImageView={product?.imageURL}
          videoUrl={product?.video}
          subImages={product?.subImages}
        />
      </div>

      {/* Center Section: Product Information */}
      <div className="w-2/3 bg-white rounded-lg">
        <ProductDetails
          key={product?._id}
          productId={product?._id}
          name={product?.name}
          seller={product?.seller._id}
          description={product?.description}
          unitPrice={product?.unitPrice}
          offer={product?.offer}
          rating={product?.rating}
          comment={product?.comment}
          order={product?.order}
        />
      </div>

      {/* Right Section: Add to Cart */}
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Add to Cart</h3>

        {/* Quantity input with increase/decrease buttons */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity:</label>
          <div className="flex items-center">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg"
              onClick={decreaseQuantity} // Decrease quantity
              disabled={quantity === 1} // Disable when quantity is 1
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity state
              className="w-full p-2 text-center border border-gray-300"
              readOnly // Make input read-only so it's controlled by buttons
            />
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg"
              onClick={increaseQuantity} // Increase quantity
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart button */}
        <button
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 mb-4"
          onClick={handleAddToCart} // Call the handler when clicked
        >
          Add to Cart
        </button>

        {/* Cancel Button */}
        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={cancelSelection} // Reset quantity
        >
          Cancel Selection
        </button>

        <p className="text-gray-600 mt-4 text-center">In Stock</p>
      </div>
    </div>
  );
};

// Add PropTypes validation
ViewSpecificProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewSpecificProduct;
