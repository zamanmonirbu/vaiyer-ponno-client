import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Add useLocation
import { loginUser } from "../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllNavSections from "../Nav/AllNavSections";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation(); // Get the location
  const { loading, error } = useSelector((state) => state.user);

  const from = location.state?.from?.pathname || "/"; // Get the previous URL or default to home

  const handleLogin = () => {
    // Dispatch login action with previous location (from)
    dispatch(loginUser({ email, password }, navigate, from)); 
  };

  // Check for error after login attempt
  if (error) {
    toast.error(error, {
      position: "bottom-right",
      autoClose: 5000,
    });
  }

  return (
    <>
      <AllNavSections />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
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
            <Link to="/user/register" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
            <Link
              to="/password-recovery"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default UserLogin;
