import PropTypes from 'prop-types'; 
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../actions/cartActions'; 

const CartSection = ({ cartItems, onQuantityChange, stocks }) => {
  const dispatch = useDispatch();

  // Handle removal of a product from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Function to limit the name length to 15-20 characters
  const truncateName = (name, maxLength = 15) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.product}
              className="flex flex-col items-center justify-between mb-4 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded"
            >
              {/* Image at the top */}
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full mb-2"
              />

              {/* Content below the image */}
              <div className="text-center">
                <p className="font-medium text-lg">
                  {truncateName(item.name, 12)} 
                </p>
                <p className="text-sm">
                  Price: ${item.unitPrice}{' '}
                  {item.offer && (
                    <span className="line-through text-red-500">${item.offer}</span>
                  )}
                </p>
                <div className="flex justify-center items-center mt-2">
                  {/* Quantity selector */}
                  <select
                    value={item.qty}
                    onChange={(e) => onQuantityChange(item.product, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(stocks).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  {/* Remove/Delete button */}
                  <button
                    onClick={() => handleRemoveFromCart(item.product)}
                    className="ml-2 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <hr className="mt-4" /> 
    </div>
  );
};

CartSection.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.string.isRequired, 
      name: PropTypes.string.isRequired,     
      imageURL: PropTypes.string.isRequired, 
      unitPrice: PropTypes.number.isRequired, 
      offer: PropTypes.number,                
      qty: PropTypes.number.isRequired,      
      stocks: PropTypes.number.isRequired  
    })
  ).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  stocks: PropTypes.number.isRequired     
};


export default CartSection;
