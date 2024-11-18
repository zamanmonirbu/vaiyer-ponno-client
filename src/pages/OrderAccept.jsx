import { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

  const { specificOrder, loading, error } = useSelector((state) => state.orders);
  const { couriers = [] } = useSelector((state) => state.courier);
  const [selectedCourier, setSelectedCourier] = useState({});

  useEffect(() => {
    dispatch(getAllCouriers());
  }, [dispatch]);

  useEffect(() => {
    if (sellerId) {
      dispatch(getOrderAsAccepted({ sellerId }));
    }
  }, [dispatch, sellerId]);

  const handleDecline = (orderId) => {
    dispatch(markOrderAsRejected(orderId));
  };

  const handleSentToCourier = (orderId) => {
    const courierId = selectedCourier[orderId];
    if (courierId) {
      dispatch(markOrderAsSentToCourier(orderId, courierId));
    } else {
      alert("Please select a courier before sending the order.");
    }
  };

  const handleCourierSelect = (orderId, courierId) => {
    setSelectedCourier((prev) => ({ ...prev, [orderId]: courierId }));
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

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
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              {/* Left Section: Customer Information */}
              <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <p className="text-gray-600">Name: {order.customerName}</p>
                <p className="text-gray-600">Email: {order.customerEmail}</p>
                <p className="text-gray-600">Mobile: {order.customerMobile}</p>
                <p className="text-gray-600">Address: {order.customerAddress}</p>
                <p className="text-gray-600">Country: {order.cus_country}</p>
              </div>

              {/* Right Section: Order Information */}
              <div className="w-full md:w-3/4">
                <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                <p className="text-gray-600">Order ID: {order._id}</p>
                <p className="text-gray-600">Transaction ID: {order.tran_id}</p>
                <p className="text-gray-600">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Shipping Method: {order.shipping_method}</p>
                <h4 className="text-md font-semibold mt-4">Products:</h4>
                <ul className="list-disc list-inside">
                  {order.products.map((product, index) => (
                    <li key={index} className="text-gray-700">
                      {product.productName} - {product.qty} x {product.price} {order.currency}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4 mt-4">
                  <button
                    onClick={() => handleDecline(order._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Decline
                  </button>

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
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No accepted orders found.</p>
      )}
    </div>
  );
};

AcceptedOrders.propTypes = {
  seller: PropTypes.object.isRequired,
};

export default AcceptedOrders;
