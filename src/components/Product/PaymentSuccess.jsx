import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearCart } from '../../actions/cartActions';
import { fetchOrderById } from '../../actions/orderAction';
import { useEffect, useState } from 'react';
import socketIo from '../../api/SocketIo';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { order } = useSelector((state) => state.orders);
  const [newOrderNotification, setNewOrderNotification] = useState(false);

  useEffect(() => {
    dispatch(clearCart());
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }

    // console.log("Setting up socket listener");
    
    socketIo.on("new-order", (data) => {
      console.log("New order received:", data);
      setNewOrderNotification(true);
    });

    return () => {
      console.log("Cleaning up socket listener");
      socketIo.off("new-order");
    };
  }, [dispatch, orderId]);

  const handleSuccess = () => {
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {newOrderNotification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">A new order has been placed!</span>
        </div>
      )}
      <div className="mb-6">
        {/* SVG icon for success */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="green"
          className="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.08.02L12.03 7a.75.75 0 1 0-1.06-1.06L7.5 9.44l-1.47-1.47a.75.75 0 0 0-1.08 1.04l2 2z" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
      <p className="text-lg text-gray-600 mb-8">Thank you for your purchase. Your payment has been processed successfully.</p>

      {/* Button to redirect to home */}
      <button onClick={handleSuccess} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
        Go to Home
      </button>

      

      {/* Order Details Table */}
      {order && (
        <div className="text-left bg-gray-100 p-6 rounded shadow-md w-3/4 max-w-3xl my-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <table className="w-full text-left table-auto">
            <tbody>
              <tr>
                <th className="border px-4 py-2">Order ID:</th>
                <td className="border px-4 py-2">{order._id}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Total Amount:</th>
                <td className="border px-4 py-2">${order.totalAmount}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Status:</th>
                <td className="border px-4 py-2">{order.status ? "Completed" : "Pending"}</td>
              </tr>
            </tbody>
          </table>

          {/* Order Items Table */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Items Purchased:</h4>
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.productName}</td>
                    <td className="border px-4 py-2">{item.qty}</td>
                    <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
                    <td className="border px-4 py-2">${(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Print Button */}
      <button onClick={handlePrint} className="bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 transition duration-300">
        Print Order
      </button>
    </div>
  );
};

export default PaymentSuccess;
