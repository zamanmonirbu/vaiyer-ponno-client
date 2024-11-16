import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrdersToCourier, updateSellerOrderToCourier } from "../../actions/sellerOrderToCourierActions";

const SellerOrdersToCourier = () => {
  const dispatch = useDispatch();
  const { sellerOrdersToCourier=[], loading, error } = useSelector(
    (state) => state.sellerOrderToCourier
  );

  useEffect(() => {
    dispatch(getSellerOrdersToCourier());
  }, [dispatch]);

  // Handle Accept or Reject of an order
  const handleStatusChange = (dId, actionType) => {
    dispatch(updateSellerOrderToCourier(dId, actionType));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Seller Orders to Courier
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : sellerOrdersToCourier.length > 0 ? ( // Check if orders exist
          <div>
            <ul className="space-y-4">
              {sellerOrdersToCourier.map((entry) => (
                <li
                  key={entry._id}
                  className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-gray-50"
                >
                  <div className="text-gray-700">
                    <p className="font-semibold">Order ID: {entry.orderId.tran_id}</p>
                    <p className="text-sm text-gray-600">Courier: {entry.courierId.name}</p>
                    <p className="text-sm text-gray-600">Status: 
                      {entry.isAccept ? "Accepted" : entry.isReject ? "Rejected" : "Pending"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {/* Accept button */}
                    <button
                      onClick={() => handleStatusChange(entry._id, "accept")}
                      disabled={entry.isAccept || entry.isReject} // Disable if already accepted or rejected
                      className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400"
                    >
                      Accept
                    </button>
                    {/* Reject button */}
                    <button
                      onClick={() => handleStatusChange(entry._id, "reject")}
                      disabled={entry.isAccept || entry.isReject} // Disable if already accepted or rejected
                      className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-gray-400"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // If no orders are found
          <div className="text-gray-600 text-center text-lg font-medium">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrdersToCourier;
