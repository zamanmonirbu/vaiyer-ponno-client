import { useEffect, useRef, useState } from "react";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import { io } from "socket.io-client";

const OrderNotification = ({ sellerId }) => {
  const [newOrder, setNewOrder] = useState([]);  // Initialize as an empty array
  const socket = useRef(null);  // Initialize as null to avoid multiple connections
  const notificationsRef = useRef([]);  // Use ref for notifications to reduce re-renders

  useEffect(() => {
    // Initialize the socket connection once
    if (!socket.current) {
      socket.current = io('http://localhost:8800'); 
      socket.current.emit("new-user-add", sellerId);
    }

    // Set up the receive-order-notification listener once
    const handleNewOrderNotification = ({ sellerId: receivedSellerId, orderDetails }) => {
      if (receivedSellerId === sellerId) {
        // Update notificationsRef and set state to trigger render
        notificationsRef.current = [...notificationsRef.current, orderDetails];
        setNewOrder([...notificationsRef.current]);
      }
    };

    socket.current.on("receive-order-notification", handleNewOrderNotification);

    // Cleanup on component unmount
    return () => {
      socket.current.off("receive-order-notification", handleNewOrderNotification);
      socket.current.disconnect();
      socket.current = null; // Reset to null to allow reconnection if necessary
    };
  }, [sellerId]);

  return (
    <div className="flex justify-center items-center flex-col p-4">
      {newOrder.length > 0 ? (
        newOrder.map((order, index) => (
          <div key={index} className="border p-4 rounded-md shadow-lg w-3/4 bg-white mb-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold text-green-600">
                New Order Notification
              </h3>
              <FaBoxOpen className="text-blue-500 text-2xl" />
            </div>
            <p className="text-lg mb-2">
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p className="text-lg mb-2">
              <strong>Total Amount:</strong> ${order.totalAmount}
            </p>
            <div>
              <h4 className="font-semibold">Products:</h4>
              <ul>
                {order.products.map((product, idx) => (
                  <li key={idx} className="text-sm">
                    {product.name} - {product.quantity} x ${product.price}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  // Update the ref and state to remove acknowledged notification
                  notificationsRef.current = notificationsRef.current.filter((_, i) => i !== index);
                  setNewOrder([...notificationsRef.current]);
                }}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
              >
                <FaCheckCircle className="mr-2" /> Acknowledge
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No new orders at the moment.</p>
      )}
    </div>
  );
};

export default OrderNotification;
