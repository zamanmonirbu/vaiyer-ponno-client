import PropTypes from "prop-types"; // Import PropTypes
import { FaTrash } from "react-icons/fa"; // Import the trash icon

const CartProduct = ({
  imageURL,
  name,
  description,
  price,
  quantity, // This is the current quantity in the cart
  stock, // Available stock
  onRemove,
  onQuantityChange,
}) => {
  // console.log(quantity,stock); 
  return (
    <div>
      <div className="flex justify-between items-start border-b p-4">
        {/* Product Image */}
        <div>
          <img
            src={imageURL}
            alt={name}
            className="w-72 h-72 object-cover rounded-xl"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 px-4">
          <h4 className="font-bold text-xl mb-4 ">{name}</h4>
          <p>{description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mt-2">
            <label htmlFor="quantity" className="mr-2">
              Qty:
            </label>
            <select
              id="quantity"
              value={quantity} // Ensure that the current quantity is reflected
              onChange={(e) => onQuantityChange(Number(e.target.value))}
              className="border p-1"
            >
              {[...Array(stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Remove and Save for Later */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <button onClick={onRemove} className="text-red-500 flex items-center">
              <FaTrash className="mr-1" /> {/* Trash icon */}
              Delete
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="w-24 text-right">
          <p className="text-lg font-bold">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

// Adding propTypes for validation
CartProduct.propTypes = {
  imageURL: PropTypes.string.isRequired,    // URL for the product image
  name: PropTypes.string.isRequired,        // Product name
  description: PropTypes.string.isRequired, // Product description
  price: PropTypes.number.isRequired,       // Product price
  quantity: PropTypes.number.isRequired,    // Quantity of the product in the cart
  stock: PropTypes.number.isRequired,       // Available stock of the product
  onRemove: PropTypes.func.isRequired,      // Function to remove the product from the cart
  onQuantityChange: PropTypes.func.isRequired, // Function to handle quantity changes
};

export default CartProduct;
