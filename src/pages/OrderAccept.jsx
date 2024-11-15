import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderAsAccepted,
  markOrderAsRejected,
  markOrderAsSentToCourier,
} from "../actions/orderAction";
import { getAllCouriers } from "../actions/courierActions";

const AcceptedOrders = ({ seller }) => {
  const sellerId = seller?._id;
  const dispatch = useDispatch();

  // Redux States
  const { specificOrder, loading, error } = useSelector((state) => state.orders);
  const { couriers = [] } = useSelector((state) => state.courier); // Default to empty array

  const [selectedCourier, setSelectedCourier] = useState({});

  // Fetch couriers on mount
  useEffect(() => {
    dispatch(getAllCouriers());
  }, [dispatch]);

  // Fetch accepted orders on mount
  useEffect(() => {
    if (sellerId) {
      dispatch(getOrderAsAccepted({ sellerId }));
    }
  }, [dispatch, sellerId]);

  // Handler for "Decline" button
  const handleDecline = (orderId) => {
    dispatch(markOrderAsRejected(orderId));
  };

  // Handler for "Sent to Courier" button
  const handleSentToCourier = (orderId) => {
    const courierId = selectedCourier[orderId];
    if (courierId) {
      dispatch(markOrderAsSentToCourier(orderId, courierId)); 
    } else {
      alert("Please select a courier before sending the order.");
    }
  };

  // Handler for selecting a courier
  const handleCourierSelect = (orderId, courierId) => {
    setSelectedCourier((prev) => ({ ...prev, [orderId]: courierId }));
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  // console.log(specificOrder);

  return (
    <div className="max-w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Accepted total {specificOrder?.length || 0} Orders
      </h2>
      {specificOrder && specificOrder.length > 0 ? (
        specificOrder.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-4 shadow-md bg-white"
          >
            <h3 className="text-xl font-medium text-gray-800">
              Order ID: {order._id}
            </h3>
            <p className="text-gray-600">Customer: {order.customerName}</p>
            <p className="text-gray-600">
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <div className="flex flex-col space-y-4 mt-4">
              {/* Decline Button */}
              <button
                onClick={() => handleDecline(order._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
              >
                Decline
              </button>

              {/* Dropdown and Send Button */}
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCourier[order._id] || ""}
                  onChange={(e) =>
                    handleCourierSelect(order._id, e.target.value)
                  }
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Courier
                  </option>
                  {couriers.map((courier) => (
                    <option key={courier._id} value={courier._id}>
                      {courier.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleSentToCourier(order._id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                  Send to Courier
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No accepted orders found.</p>
      )}
    </div>
  );
};

export default AcceptedOrders;
