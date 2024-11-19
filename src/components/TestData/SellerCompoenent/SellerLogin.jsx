import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSeller } from "../../../actions/sellerActions";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import AllNavSections from "../../Nav/AllNavSections";


const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, seller } = useSelector((state) => state.seller);
  // console.log(seller.token);

  const handleLogin = () => {
    dispatch(loginSeller({ email, password }));
  };

  console.log(seller?.seller?.id)

  // Use useEffect to show success and error notifications
  useEffect(() => {
    if (seller?.token) {
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 5000,
      });

      

      navigate("/seller/dashboard/test"); // Navigate to dashboard on success
    }



    if (error) {
      toast.error(error, {
        position: "bottom-right", // Position in bottom right
        autoClose: 5000, // Duration to display
        className: 'toast-error' // Custom class for error toasts
      });
    }
  }, [error, navigate,seller?.token]);

  return (
    <>
      <AllNavSections />
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Seller Login</h2>
          {loading && <p className="text-blue-500 text-center">Loading...</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
          <div className="flex justify-between mt-4">
            <Link to="/seller/register" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
            <Link to="/password-recovery" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      <style>
        {`
          .toast-error {
            background-color: #f74949; /* Set background color to red */
            color: white; /* Set text color to white for visibility */
          }
        `}
      </style>
    </>
  );
};

export default SellerLogin;
