import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveredOrders } from "../../actions/courierToDeliveryManActions";

const CompletedDeliveries = ({ deliveryManId }) => {
  const dispatch = useDispatch();

  const { loading, deliveries = [], error } = useSelector(
    (state) => state.deliveryMan
  );

  useEffect(() => {
    dispatch(fetchDeliveredOrders(deliveryManId));
  }, [dispatch, deliveryManId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Completed Deliveries
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : deliveries.length === 0 ? (
        <p className="text-center text-gray-600">No completed deliveries found.</p>
      ) : (
        <ul className="space-y-4">
          {deliveries.map((delivery) => (
            <li
              key={delivery._id}
              className="p-6 bg-white shadow rounded-md border space-y-4"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Order Details
                </h3>
                <p>
                  <strong>Order ID:</strong> {delivery?.orderId?.tran_id}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(delivery?.orderId?.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Delivered At:</strong>{" "}
                  {new Date(delivery.updatedAt).toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Customer Details
                </h3>
                <p>
                  <strong>Name:</strong> {delivery?.orderId?.customerName}
                </p>
                <p>
                  <strong>Email:</strong> {delivery?.orderId?.customerEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {delivery?.orderId?.customerMobile}
                </p>
                <p>
                  <strong>Address:</strong> {delivery?.orderId?.customerAddress}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Product Details
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {delivery?.orderId?.products?.map((product, index) => (
                    <li key={index}>
                      <strong>Product:</strong> {product.productName} -{" "}
                      <strong>Qty:</strong> {product.qty} -{" "}
                      <strong>Price:</strong> {product.price}{" "}
                      {delivery?.orderId?.currency}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedDeliveries;
