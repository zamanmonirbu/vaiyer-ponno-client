import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../actions/cartActions';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(clearCart());
  },[dispatch])

  const handleSuccess=()=>{
    navigate('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
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
      <button onClick={handleSuccess} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">Go to Home</button>
    </div>
  );
};

export default PaymentSuccess;
