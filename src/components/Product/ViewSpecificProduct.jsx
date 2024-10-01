import { useEffect } from "react";
import ProductViewLeft from "./ProductViewLeft";
import { getProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import PropTypes from "prop-types";
import AddToCartSection from "./AddToCartSection"; // Import new component

const ViewSpecificProduct = ({ id }) => {
  const dispatch = useDispatch();

  // Fetch product details
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Add to cart handler
  const handleAddToCart = (quantity) => {
    dispatch(addToCart(product?._id, quantity));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  // Calculate average rating and total orders
  const averageRating = product?.rating?.length
    ? product.rating.reduce((acc, val) => acc + val, 0) 
    : 0;

  const totalOrders = product?.order?.length || 0;

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
          rating={averageRating}  // Pass average rating
          comment={product?.comment}
          order={totalOrders}  // Pass total orders
          sellerLocation={product?.sellerLocation}
          quantity={product?.quantity}
          area={product?.area}
          cities={product?.cities}
        />
      </div>

      {/* Right Section: Add to Cart */}
      <div className="w-1/3">
        <AddToCartSection
          unitPrice={product?.unitPrice}
          offer={product?.offer}
          stock={product?.quantity} // Assuming 'quantity' is the stock count
          handleAddToCart={handleAddToCart}
          sellerLocation={product?.sellerLocation}
          maxDistance={product?.area}
        />
      </div>
    </div>
  );
};

// Add PropTypes validation
ViewSpecificProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewSpecificProduct;
