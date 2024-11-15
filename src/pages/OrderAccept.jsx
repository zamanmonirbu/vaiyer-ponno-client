  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { getOrderAsAccepted, markOrderAsSentToCourier,markOrderAsRejected  } from "../actions/orderAction";



  const AcceptedOrders = ({seller}) => {
    const sellerId=seller?._id;
    const dispatch = useDispatch();
    const { specificOrder, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
      // Fetch accepted orders on component mount
      dispatch(getOrderAsAccepted({sellerId}));
    }, [dispatch,sellerId]);

    // Handler for "Decline" button
    const handleDecline = (orderId) => {
      dispatch(markOrderAsRejected(orderId));
    };

    // Handler for "Sent to Courier" button
    const handleSentToCourier = (orderId) => {
      dispatch(markOrderAsSentToCourier(orderId));
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="max-full mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Accepted total {specificOrder.length} Orders</h2>
        {specificOrder && specificOrder.length > 0 ? (
          specificOrder.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 mb-4 shadow-md bg-white">
              <h3 className="text-xl font-medium text-gray-800">Order ID: {order._id}</h3>
              <p className="text-gray-600">Customer: {order.customerName}</p>
              <p className="text-gray-600">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              {/* Additional order details can go here */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleDecline(order._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleSentToCourier(order._id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                  Sent to Courier
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No accepted orders found.</p>
        )}
      </div>
    );
  };

  export default AcceptedOrders;
