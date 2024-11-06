// components/SellerOrders.js

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersBySellerId } from "../actions/orderAction.js";

const SellerOrders = ({ seller }) => {
  const sellerId = seller._id;
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchOrdersBySellerId(sellerId));
    }
  }, [dispatch, sellerId]);

  const printOrder = (orderId) => {
    const printContents = document.getElementById(orderId).innerHTML; // Get the order content
    const newWindow = window.open("", "_blank"); // Open a new window
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .order-details { margin-bottom: 20px; }
          </style>
        </head>
        <body onload="window.print();">
          <h2>Order ID: ${orderId}</h2>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Your Orders</h2>

      {loading && <p className="text-center">Loading orders...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid gap-4">
        {orders.map((order) => {
          // Calculate the total price for the current order
          const totalPrice = order.products.reduce((acc, product) => {
            return acc + product.qty * product.price; // Calculate subtotal for each product
          }, 0);

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
                <p className="text-gray-700">
                  Address: {order.customerAddress}
                </p>
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
                      <div className="text-gray-700">
                        Quantity: {product.qty}
                      </div>
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
                {/* Print Button */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => printOrder(order._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Print Order
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
