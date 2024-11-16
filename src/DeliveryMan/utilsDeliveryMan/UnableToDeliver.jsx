import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRejectedOrders } from "../../actions/DeliveryManActions";

const UnableToDeliver = ({ deliveryManId }) => {
  const dispatch = useDispatch();

  const { loading, rejections=[], error } = useSelector((state) => state.courierToDeliveryMan);

  useEffect(() => {
    dispatch(fetchRejectedOrders(deliveryManId));
  }, [dispatch, deliveryManId]);

  console.log(rejections)


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Unable to Deliver</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : rejections.length === 0 ? (
        <p>No rejected deliveries found.</p>
      ) : (
        <ul className="space-y-4">
          {rejections.map((delivery) => (
            <li key={delivery._id} className="p-4 bg-white shadow rounded-md">
              <p>Order ID: {delivery?.orderId?.tran_id}</p>
              <p>Courier: {delivery?.courierId?.name}</p>
              <p>Rejection Notes: {delivery?.notes || "No notes provided"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UnableToDeliver;
