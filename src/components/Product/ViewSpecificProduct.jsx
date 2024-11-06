import { useEffect } from "react";
import ProductViewLeft from "./ProductViewLeft";
import { addToCart, getCartProducts } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import PropTypes from "prop-types";
import AddToCartSection from "./AddToCartSection";
import CartSection from "./CartSection";
import { getCookie ,setCookie} from "../../actions/cookieUtils";



const ViewSpecificProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Fetch cart products on mount
  useEffect(() => {
    dispatch(getCartProducts());
    
    // Store product details in cookies when the component mounts
    const viewedProductsCookie = getCookie("viewedProducts");
    const viewedProducts = viewedProductsCookie ? JSON.parse(viewedProductsCookie) : [];
    
    // Check if the product is already in the viewed list
    const productExists = viewedProducts.some((item) => item._id === product?._id);

    // If the product is not already viewed, add it
    if (!productExists) {
      viewedProducts.push({
        _id: product._id,
        name: product.name,
        imageURL: product.imageURL,
        unitPrice: product.unitPrice,
      });
      setCookie("viewedProducts", JSON.stringify(viewedProducts), 30); // Set cookie to expire in 30 days
    }
  }, [dispatch, product]);

  // Add to cart handler
  const handleAddToCart = (quantity) => {
    dispatch(addToCart(product?._id, quantity));
  };

  // Handle quantity change in the cart
  const handleQuantityChange = (productId, quantity) => {
    dispatch(addToCart(productId, quantity));
  };

  const totalOrders = (product?.order)?.length;

  // Adjust width based on whether there are items in the cart
  const isCartFull = cartItems.length > 0;
  const productDetailsWidth = isCartFull ? "w-1/2" : "w-2/3";
  const rightSectionWidth = isCartFull ? "w-1/2" : "w-1/3";

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
      <div className={`${productDetailsWidth} bg-white rounded-lg`}>
        <ProductDetails
          key={product?._id}
          productId={product?._id}
          name={product?.name}
          sellerId={product?.seller._id}
          description={product?.description}
          unitPrice={product?.unitPrice}
          offer={product?.offer}
          rating={product?.rating} // Pass average rating
          comment={product?.comment}
          order={totalOrders} // Pass total orders
          sellerLocation={product?.sellerLocation}
          quantity={product?.quantity}
          area={product?.area}
          cities={product?.cities}
        />
      </div>

      {/* Right Section: Add to Cart and Cart Section */}
      <div className={`${rightSectionWidth} flex flex-row gap-4`}>
        <AddToCartSection
          unitPrice={product?.unitPrice}
          offer={product?.offer}
          stock={product?.quantity} 
          handleAddToCart={handleAddToCart}
          sellerLocation={product?.sellerLocation}
          maxDistance={product?.area}
        />
        {isCartFull && (
          <CartSection
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            stocks={product?.quantity}
          />
        )}   
      </div>
    </div>
  );
};

// PropTypes validation to ensure correct prop types
ViewSpecificProduct.propTypes = {
  product: PropTypes.object.isRequired, // Make sure product is an object
};

export default ViewSpecificProduct;
