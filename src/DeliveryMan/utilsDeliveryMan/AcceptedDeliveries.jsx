import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedOrders } from "../../actions/courierToDeliveryManActions";


const AcceptedDeliveries = ({ deliveryManId }) => {
  const dispatch = useDispatch();

  const { loading, assignments=[], error } = useSelector((state) => state.deliveryMan);

  console.log(assignments)

  useEffect(() => {
    dispatch(fetchAssignedOrders(deliveryManId));
  }, [dispatch, deliveryManId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Accepted Deliveries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : assignments.length === 0 ? (
        <p>No accepted deliveries yet.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((delivery) => (
            <li key={delivery._id} className="p-4 bg-white shadow rounded-md">
              <p>Order ID: {delivery?.orderId?.tran_id}</p>
              <p>Courier: {delivery?.courierId?.name}</p>
              <p>Delivery Notes: {delivery?.notes || "No notes provided"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AcceptedDeliveries;
