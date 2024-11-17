import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments, updateAssignmentStatus } from "../../actions/courierToDeliveryManActions";

const DeliveryAssignments = ({ deliveryManId }) => {
  const dispatch = useDispatch();

  const { assignments = [], loading, error } = useSelector(
    (state) => state.deliveryMan
  );

  console.log(assignments)

  // Fetch assignments on component mount
  useEffect(() => {
    if (deliveryManId) {
      dispatch(fetchAssignments(deliveryManId));
    }
  }, [dispatch, deliveryManId]);

  // Handle accept/reject actions
  const handleAction = (assignmentId, actionType) => {
    // console.log(assignmentId, actionType)
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
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-600">No assignments found.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.length>0&&assignments?.map((assignment) => (
              <li
                key={assignment._id}
                className="p-6 border rounded-md shadow-sm bg-gray-50"
              >
                <div className="space-y-2">
                  {/* Order Details */}
                  <div>
                    <p className="font-semibold text-lg">
                      Order ID: {assignment?.orderId?.tran_id}
                    </p>
                    <p className="text-gray-600">
                      Customer Name: {assignment?.orderId?.customerName}
                    </p>
                    <p className="text-gray-600">
                      Customer Phone: {assignment?.orderId?.customerMobile}
                    </p>
                    <p className="text-gray-600">
                      Delivery Address: {assignment?.orderId?.customerAddress
                      }
                    </p>
                    <p className="text-gray-600">
                    Total Amount: {assignment?.orderId?.totalAmount
                      }
                    </p>
                    <p className="text-gray-600">
                    Payment Status: {assignment?.orderId?.status?<span className="text-green-500">Complete</span>:<span className="text-red">Cash On Delivery</span>
                      }
                    </p>
                  </div>

                  {/* Courier Details */}
                  <div>
                    <p className="font-semibold text-lg">Courier Details:</p>
                    <p className="text-gray-600">
                      Name: {assignment?.courierId?.name}
                    </p>
                    <p className="text-gray-600">
                      Contact: {assignment?.courierId?.phone}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() =>
                        handleAction(assignment?._id, "accept")
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleAction(assignment?._id, "reject")
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeliveryAssignments;
