import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart); // Access cart items from Redux state

  // Function to handle quantity changes
  const handleQuantityChange = (productId, newQty) => {
    dispatch(addToCart(productId, newQty));
  };

  // Function to remove item from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.qty,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex">
        <div className="w-3/4 bg-white p-4">
          {cartItems.length === 0 ? (
            <p>
              No items in your cart. <Link to="/">Go Shopping</Link>
            </p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="w-1/3">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p>Price: ৳{item.unitPrice}</p>
                  </div>
                  <div className="w-1/3 flex items-center">
                    <label htmlFor={`qty-${item.product}`} className="mr-2">
                      Qty:
                    </label>
                    <select
                      id={`qty-${item.product}`}
                      value={item.qty}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product,
                          Number(e.target.value)
                        )
                      }
                      className="border rounded p-2"
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemoveFromCart(item.product)}
                      className="text-red-600 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                  <div>Subtotal: ৳{item.unitPrice * item.qty}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">
            Subtotal ({cartItems.length} items)
          </h2>
          <p className="text-lg font-semibold">৳{subtotal.toFixed(2)}</p>
          <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
