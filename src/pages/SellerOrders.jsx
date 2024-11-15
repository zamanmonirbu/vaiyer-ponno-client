import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersBySellerId, updateOrder } from "../actions/orderAction.js";
import { format, formatDistanceToNow } from 'date-fns';



const SellerOrders = ({ seller }) => {
  const sellerId = seller._id;
  const dispatch = useDispatch();
  const { sellerOrders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchOrdersBySellerId(sellerId));
    }
  }, [dispatch, sellerId]);

  const handleOrderAction = (orderId, action) => {
    let updateData = {};
  
    if (action === "Accept") {
      updateData = { sellerAccepted: true, sellerAcceptedAt: new Date() };
    } else if (action === "Decline") {
      updateData = { sellerRejected: true, sellerRejectedAt: new Date() };
    } else if (action === "Sent to Courier") {
      updateData = { sentToCourier: true, sentToCourierAt: new Date() };
    }
  
    dispatch(updateOrder(orderId, updateData));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Your requested {sellerOrders?.length} Orders</h2>

      {loading && <p className="text-center">Loading orders...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid gap-4">
        {sellerOrders?.map((order) => {
          // Calculate the total price for the current order
          const totalPrice = order.products.reduce((acc, product) => {
            return acc + product.qty * product.price; // Calculate subtotal for each product
          }, 0);

          // Check if the createdAt exists and is a valid date
          const createdAt = order.createdAt ? new Date(order.createdAt) : null;

          // Format the createdAt date to a more readable format, if available
          const formattedDate = createdAt ? format(createdAt, 'PPpp') : 'No date available';

          // Calculate how much time ago the order was placed, if createdAt is valid
          const timeAgo = createdAt ? formatDistanceToNow(createdAt, { addSuffix: true }) : 'N/A';

          return (
            <div
              key={order._id}
              id={order._id} // Add id for printing
              className="border border-gray-300 p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
            >
              <p className="text-lg font-semibold mb-2">
                Order ID: <span className="text-blue-500">{order.tran_id}</span>
              </p>

              {/* Customer Details */}
              <div className="mb-4 border-b border-gray-200 pb-2">
                <p className="font-bold text-md">Customer Details</p>
                <p className="text-gray-700">Customer: {order.customerName}</p>
                <p className="text-gray-700">Mobile: {order.customerMobile}</p>
                <p className="text-gray-700">Address: {order.customerAddress}</p>
              </div>

              {/* Order Details */}
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="font-bold text-md mb-2">Order Details</p>
                <p className="font-bold mt-2">Products:</p>
                <ul className="list-none ml-5">
                  {order.products.map((product, index) => (
                    <li
                      key={product.productId}
                      className="m-2 p-4 rounded-md bg-gray-200"
                    >
                      <div className="font-semibold">
                        {index + 1}. {product.productName}
                      </div>
                      <div className="text-gray-700">
                        Unit Price: ${product.price.toFixed(2)}
                      </div>
                      <div className="text-gray-700">Quantity: {product.qty}</div>
                      <div className="text-gray-700">
                        Subtotal Price: ${" "}
                        {(product.qty * product.price).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-2 font-bold">
                  Total Price:{" "}
                  <span className="text-lg">${totalPrice.toFixed(2)}</span>
                </p>
                <p className="mt-2">
                  Payment:{" "}
                  <span
                    className={order.status ? "text-green-500" : "text-red-500"}
                  >
                    {order.status ? "Completed" : "Pending"}
                  </span>
                </p>

                {/* Ordered Time and Time Ago */}
                <p className="mt-2">
                  Ordered Time: {formattedDate} <br />
                  <span className="text-gray-500 text-sm">
                    ({timeAgo})
                  </span>
                </p>

                {/* Order Action Buttons */}
                <div className="flex align-center justify-center mt-4">
                  <button
                    onClick={() => handleOrderAction(order._id, "Accept")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-2"
                  >
                    Accept Order
                  </button>
                  <button
                    onClick={() => handleOrderAction(order._id, "Decline")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2"
                  >
                    Decline Order
                  </button>
                  <button
                    onClick={() => handleOrderAction(order._id, "Sent to Courier")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Sent to Courier
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Prop Types Validation
SellerOrders.propTypes = {
  seller: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SellerOrders;
