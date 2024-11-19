import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrder } from "../../actions/sellerOrderToCourierActions";
import { assignOrder, fetchDeliveryMenByCourier } from "../../actions/courierToDeliveryManActions";

const AcceptOrders = ({ courierId }) => {
  const dispatch = useDispatch();

  const { orders = [], loading, error } = useSelector(
    (state) => state.sellerOrderToCourier
  );

  const { deliveryMen = [] } = useSelector((state) => state.deliveryMan);

  const [selectedDeliveryMen, setSelectedDeliveryMen] = useState({});
  const [notes, setNotes] = useState({});

  useEffect(() => {
    dispatch(acceptOrder(courierId)); // Fetch accepted orders
    dispatch(fetchDeliveryMenByCourier(courierId)); // Fetch all delivery men
  }, [dispatch, courierId]);

  const handleAssignOrder = (orderId, deliveryManId, mainOrderId) => {
    const note = notes[orderId] || "";
    dispatch(assignOrder({ orderId, deliveryManId, courierId, note, mainOrderId }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Accepted Orders by courier
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
                <div>
                  <h2 className="font-semibold text-gray-800">Order Information</h2>
                  <p><strong>Order ID:</strong> {order.orderId._id}</p>
                  <p><strong>Courier:</strong> {order.courierId.name}</p>
                  <p><strong>Status:</strong> Accepted</p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.orderId.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">Customer Information</h2>
                  <p><strong>Name:</strong> {order.orderId.customerName}</p>
                  <p><strong>Email:</strong> {order.orderId.customerEmail}</p>
                  <p><strong>Mobile:</strong> {order.orderId.customerMobile}</p>
                  <p><strong>Address:</strong> {order.orderId.customerAddress}</p>
                  <p><strong>Country:</strong> {order.orderId.cus_country}</p>
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">Product Information</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {order.orderId.products.map((product, index) => (
                      <li key={index}>
                        <strong>Product:</strong> {product.productName} -{" "}
                        <strong>Qty:</strong> {product.qty} -{" "}
                        <strong>Price:</strong> {product.price}{" "}
                        {order.orderId.currency}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-2">
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
                        {man.firstName} ({man?.vehicleType?.name}) - {man.phone}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Add notes for delivery (optional)"
                    value={notes[order._id] || ""}
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [order._id]: e.target.value,
                      }))
                    }
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <button
                  onClick={() =>
                    handleAssignOrder(order._id, selectedDeliveryMen[order._id], order?.orderId?._id)
                  }
                  disabled={!selectedDeliveryMen[order._id]}
                  className="mt-4 px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400"
                >
                  Assign
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AcceptOrders;
