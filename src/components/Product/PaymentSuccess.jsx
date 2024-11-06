import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearCart } from '../../actions/cartActions';
import { fetchOrderById } from '../../actions/orderAction';
import { useEffect, useState } from 'react';
import socketIo from '../../api/SocketIo';
import { submitReview } from '../../actions/sellerActions';
import { FaPrint, FaStar } from 'react-icons/fa'; // Import the star icon

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { order } = useSelector((state) => state.orders);
  const [newOrderNotification, setNewOrderNotification] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(true);
  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    dispatch(clearCart());
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }

    socketIo.on("new-order", (data) => {
      setNewOrderNotification(true);
      console.log(data);
    });

    return () => {
      socketIo.off("new-order");
    };
  }, [dispatch, orderId]);

  const handleInputChange = (productId, field, value) => {
    setReviewData((prevData) => ({
      ...prevData,
      [productId]: {
        ...prevData[productId],
        [field]: value,
      },
    }));
  };

  const handleReviewSubmit = async (productId) => {
    const { rating, review } = reviewData[productId] || {};
    const sellerId = order.sellerIds[0];
    if (rating && review) {
      await dispatch(submitReview({ sellerId, rating, review, user: order.customerId }));
      setIsReviewModalOpen(false);
    } else {
      alert("Please provide both rating and review");
    }
  };

  const handleSuccess = () => {
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStarClick = (productId, rating) => {
    handleInputChange(productId, "rating", rating);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {newOrderNotification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">A new order has been placed!</span>
        </div>
      )}

<div className="mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.08.02L12.03 7a.75.75 0 1 0-1.06-1.06L7.5 9.44l-1.47-1.47a.75.75 0 0 0-1.08 1.04l2 2z" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
      <p className="text-lg text-gray-600 mb-8">Thank you for your purchase. Your payment has been processed successfully.</p>
      <button onClick={handleSuccess} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
        Go to Home
      </button>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-4/5 md:w-1/3"> {/* Changed width here */}
            <h3 className="text-xl font-semibold mb-4">Please Provide Your Reviews On Seller</h3>
            <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-500 text-sm absolute top-2 right-2">✕</button>
            {order?.products?.map((item) => (
              <div key={item.productId} className="mb-4">
                <div className="flex flex-col">
                  <label className="mt-2">Rating:</label>
                  <div className="flex my-2 mx-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        onClick={() => handleStarClick(item.productId, star)}
                        className={`cursor-pointer w-6 h-6 ${reviewData[item.productId]?.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                      />
                    ))}
                  </div>
                  <label className="mt-2">Review:</label>
                  <textarea
                    value={reviewData[item.productId]?.review || ""}
                    onChange={(e) => handleInputChange(item.productId, "review", e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Write your review here"
                  />
                  <button
                    onClick={() => handleReviewSubmit(item.productId)}
                    className="bg-[#0d9488] text-white py-1 px-4 rounded hover:bg-[#395b58] mt-2" // Updated button color
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Summary */}
      {order && (
        <div className="text-left bg-gray-100 p-6 rounded shadow-md w-3/4 max-w-3xl my-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <table className="w-full text-left table-auto">
            <tbody>
              <tr><th className="border px-4 py-2">Order ID:</th><td className="border px-4 py-2">{order._id}</td></tr>
              <tr><th className="border px-4 py-2">Total Amount:</th><td className="border px-4 py-2">${order.totalAmount}</td></tr>
              <tr><th className="border px-4 py-2">Status:</th><td className="border px-4 py-2">{order.status ? "Completed" : "Pending"}</td></tr>
            </tbody>
          </table>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Items Purchased:</h4>
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr><th className="border px-4 py-2">Product Name</th><th className="border px-4 py-2">Quantity</th><th className="border px-4 py-2">Price</th><th className="border px-4 py-2">Total</th></tr>
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

      <button onClick={handlePrint} className="flex bg-[#0d9488] text-white py-2 px-4 mt-4 rounded hover:bg-[#395b58] transition duration-300">
       <FaPrint/> <span className='ml-2'>Print Order</span>
      </button>
    </div>
  );
};

export default PaymentSuccess;
