import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartProducts, removeFromCart,clearCart } from "../../actions/cartActions";
import CartSummary from "./CartSummary ";
import CartProduct from "./CartProduct";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";
import StrikeLine from "../Utilities/StrikeLine";
import Navbar from "../Nav/Navbar";


const ViewProductsOnCart = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // Get cart items from Redux state
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Fetch cart items from localStorage when the component mounts
  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  // Handle quantity change for a product
  const handleQuantityChange = (id, qty) => {
    dispatch(addToCart(id, qty)); // Re-add to cart with updated quantity
  };

  // Handle remove product from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.qty,
    0
  );


  // console.log(cartItems)

  return (
    <div className="flex justify-between mt-8">
      {/* Products List */}
      <div className="w-2/3 bg-gray-100 p-4 rounded-lg ml-[15%] mr-4">
      <b className="text-center text-3xl text-gray-700">Shopping Cart</b>
      <StrikeLine/>
        {cartItems.length === 0 ? (
          <EmptyCart/>
        ) : (
          cartItems.map((item) => (
            <CartProduct
              key={item.product}
              imageURL={item.imageURL}
              name={item.name}
              description={item.description}
              price={item.unitPrice}
              offer={item.offer}
              quantity={item.qty}
              stock={item.stock}
              onRemove={() => handleRemove(item.product)}
              onQuantityChange={(qty) => handleQuantityChange(item.product, qty)}
            />
          ))
        )}
      </div>

      {/* Summary */}
      <div className="w-1/3 mr-[15%]">
        <CartSummary
          totalItems={cartItems.length}
          subtotal={subtotal}
          onCheckout={() => navigate('/checkout')}
        />
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default ViewProductsOnCart;
