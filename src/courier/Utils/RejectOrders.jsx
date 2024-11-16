// components/RejectOrders.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../../actions/sellerOrderToCourierActions";


const RejectOrders = () => {
  const dispatch = useDispatch();
  const { orders=[], loading, error } = useSelector(
    (state) => state.sellerOrderToCourier
  );

  useEffect(() => {
    dispatch(deleteOrder());
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Rejected Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">No rejected orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="p-4 border rounded-md shadow-sm bg-red-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">Order ID: {order.orderId.tran_id}</p>
                  <p className="text-sm text-gray-600">Courier: {order.courierId.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RejectOrders;
