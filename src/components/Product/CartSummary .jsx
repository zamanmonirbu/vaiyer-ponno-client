import PropTypes from 'prop-types'; // Import PropTypes

const CartSummary = ({ totalItems, subtotal, onCheckout }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="font-bold">Subtotal ({totalItems} items): ${subtotal.toFixed(2)}</h2>
      <button
        onClick={onCheckout}
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Proceed to checkout
      </button>
    </div>
  );
};

// Adding propTypes for validation
CartSummary.propTypes = {
  totalItems: PropTypes.number.isRequired,   // Total number of items in the cart
  subtotal: PropTypes.number.isRequired,     // Subtotal price of the cart items
  onCheckout: PropTypes.func.isRequired,     // Function to handle checkout action
};

export default CartSummary;
