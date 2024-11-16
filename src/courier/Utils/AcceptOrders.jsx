import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrder } from "../../actions/sellerOrderToCourierActions";
import { fetchDeliveryMenByCourier } from "../../actions/DeliveryManActions";
import axiosInstance from "../../api/axiosInstance";

const AcceptOrders = ({courierId}) => {
  const dispatch = useDispatch();

  const { orders = [], loading, error } = useSelector(
    (state) => state.sellerOrderToCourier
  );

  const { deliveryMen = [] } = useSelector(
    (state) => state.deliveryMan
  ); // Global delivery men list from Redux

  const [selectedDeliveryMen, setSelectedDeliveryMen] = useState({}); // Store selected delivery man for each order

  console.log(deliveryMen)

  useEffect(() => {
    dispatch(acceptOrder()); // Fetch accepted orders
    dispatch(fetchDeliveryMenByCourier(courierId)); // Fetch all delivery men once
  }, [dispatch,courierId]);

  // Handle assigning an order to a delivery man
  const assignToDeliveryMan = async (orderId, deliveryManId) => {
    try {
      await axiosInstance.post(`/api/courierToDeliveryMan`, {
        orderId,
        deliveryManId,
      });
      alert("Order successfully assigned to delivery man!");
    } catch (error) {
      console.error("Failed to assign order:", error);
      alert("Failed to assign order to delivery man.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Accepted Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">No accepted orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="p-4 border rounded-md shadow-sm bg-green-50 flex flex-col space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order ID: {order.orderId.tran_id}</p>
                    <p className="text-sm text-gray-600">
                      Courier: {order.courierId.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Dropdown for all delivery men */}
                  <select
                    onChange={(e) =>
                      setSelectedDeliveryMen((prev) => ({
                        ...prev,
                        [order._id]: e.target.value,
                      }))
                    }
                    value={selectedDeliveryMen[order._id] || ""}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Select Delivery Man</option>
                    {deliveryMen.map((man) => (
                      <option key={man._id} value={man._id}>
                        {man.firstName} {man?.vehicleType?.name} (Phone: {man.phone})
                      </option>
                    ))}
                  </select>
                  {/* Button to assign order */}
                  <button
                    onClick={() =>
                      assignToDeliveryMan(
                        order._id,
                        selectedDeliveryMen[order._id]
                      )
                    }
                    disabled={!selectedDeliveryMen[order._id]}
                    className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400"
                  >
                    Assign
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AcceptOrders;
