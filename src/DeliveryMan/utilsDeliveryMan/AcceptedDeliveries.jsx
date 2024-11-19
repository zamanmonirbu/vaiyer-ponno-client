import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedOrders } from "../../actions/courierToDeliveryManActions";
import { markOrderAsCompleted } from "../../actions/orderAction";

const AcceptedDeliveries = ({ deliveryManId }) => {
  const dispatch = useDispatch();

  const {
    loading,
    assignments = [],
    error,
  } = useSelector((state) => state.deliveryMan);
  const { specificOrder } = useSelector((state) => state.orders); 

  useEffect(() => {
    dispatch(fetchAssignedOrders(deliveryManId));
  }, [dispatch, deliveryManId, specificOrder]);

  const handleCompleteDelivery = (orderId) => {
    dispatch(markOrderAsCompleted(orderId));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Accepted Deliveries</h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : !Array.isArray(assignments) || assignments.length === 0 ? (
        <p>No accepted deliveries yet.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((delivery) => (
            <li key={delivery._id} className="p-4 bg-white shadow rounded-md">
              <p className="font-bold">Order ID: {delivery?.orderId?._id}</p>
              <p>Delivery Notes: {delivery?.notes || "No notes provided"}</p>
              <p>
                Total Amount:{" "}
                <span className="font-semibold">
                  BDT {delivery?.orderId?.totalAmount}
                </span>
              </p>
              <p>
                Products:{" "}
                {delivery?.orderId?.products?.map((product) => (
                  <span key={product.productId}>
                    {product.productName} (Qty: {product.qty})
                  </span>
                ))}
              </p>
              <hr className="my-2" />

              <h3 className="font-bold text-lg">Customer Details:</h3>
              <p>Name: {delivery?.orderId?.customerName}</p>
              <p>Email: {delivery?.orderId?.customerEmail}</p>
              <p>Phone: {delivery?.orderId?.customerMobile}</p>
              <p>Address: {delivery?.orderId?.customerAddress}</p>
              <hr className="my-2" />

              <h3 className="font-bold text-lg">Courier Details:</h3>
              <p>Courier: {delivery?.courierId?.name}</p>
              <p>Phone: {delivery?.courierId?.phone}</p>
              <p>Address: {delivery?.courierId?.address}</p>
              <hr className="my-2" />

              <button
                onClick={() => handleCompleteDelivery(delivery?.orderId?._id)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
              >
                Complete Delivery
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AcceptedDeliveries.propTypes = {
  deliveryManId: PropTypes.string.isRequired,
};

export default AcceptedDeliveries;
