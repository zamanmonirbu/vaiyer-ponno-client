import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveredOrders } from "../../actions/DeliveryManActions";

const CompletedDeliveries = ({ deliveryManId }) => {
  const dispatch = useDispatch();

  const { loading, deliveries=[], error } = useSelector((state) => state.courierToDeliveryMan);


  useEffect(() => {
    dispatch(fetchDeliveredOrders(deliveryManId));
  }, [dispatch, deliveryManId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Completed Deliveries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : deliveries.length === 0 ? (
        <p>No completed deliveries found.</p>
      ) : (
        <ul className="space-y-4">
          {deliveries.map((delivery) => (
            <li key={delivery._id} className="p-4 bg-white shadow rounded-md">
              <p>Order ID: {delivery?.orderId?.tran_id}</p>
              <p>Customer: {delivery?.orderId?.customerName}</p>
              <p>Delivered At: {new Date(delivery.updatedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedDeliveries;
