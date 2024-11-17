import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchAssignments,
  updateAssignmentStatus,
} from "../../actions/courierToDeliveryManActions";

const DeliveryAssignments = ({ deliveryManId }) => {
  const dispatch = useDispatch();

  // UseSelector with default value for assignments
  const { assignments = [], loading, error } = useSelector(
    (state) => state.deliveryMan || {}
  );

  console.log(assignments); // Debug log for checking assignments data

  // Fetch assignments on component mount
  useEffect(() => {
    if (deliveryManId) {
      dispatch(fetchAssignments(deliveryManId));
    }
  }, [dispatch, deliveryManId]);

  // Handle accept/reject actions
  const handleAction = (assignmentId, actionType) => {
    dispatch(updateAssignmentStatus({ assignmentId, actionType }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Delivery Assignments
        </h1>

        {loading ? (
          <div className="text-center text-blue-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : assignments?.length === 0 ? (
          <p className="text-center text-gray-600">No assignments found.</p>
        ) : Array.isArray(assignments) ? ( // Ensure assignments is an array
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li
                key={assignment._id}
                className="p-6 border rounded-md shadow-sm bg-gray-50"
              >
                {/* Order Details */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order Details
                  </h2>
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {assignment?.orderId?._id || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Total Amount:</span>{" "}
                    {assignment?.orderId?.totalAmount || "N/A"} BDT
                  </p>
                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {assignment?.orderId?.status ? (
                      <span className="text-green-500">Complete</span>
                    ) : (
                      <span className="text-red-500">Cash On Delivery</span>
                    )}
                  </p>
                </div>

                {/* Product Details */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Product Details
                  </h2>
                  <ul className="list-none list-inside">
                    {assignment?.orderId?.products?.map((product, index) => (
                      <li key={index}>
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {product.productName}
                        </p>
                        <p>
                          <span className="font-semibold">Price:</span>{" "}
                          {product.price} BDT
                        </p>
                        <p>
                          <span className="font-semibold">Quantity:</span>{" "}
                          {product.qty}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Information */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Customer Information
                  </h2>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {assignment?.orderId?.customerName || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {assignment?.orderId?.customerEmail || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {assignment?.orderId?.customerMobile || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {assignment?.orderId?.customerAddress || "N/A"}
                  </p>
                </div>

                {/* Courier Details */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Courier Information
                  </h2>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {assignment?.courierId?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {assignment?.courierId?.phone || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {assignment?.courierId?.address || "N/A"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleAction(assignment?._id, "accept")}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(assignment?._id, "reject")}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Unexpected data format.</p>
        )}
      </div>
    </div>
  );
};

DeliveryAssignments.propTypes = {
  deliveryManId: PropTypes.string.isRequired, // Ensure deliveryManId is a required string
};


export default DeliveryAssignments;
