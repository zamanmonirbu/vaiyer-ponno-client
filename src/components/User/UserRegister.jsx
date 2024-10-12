import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; 
import { registerUser } from "../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllNavSections from "../Nav/AllNavSections";


const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");  
  const [address, setAddress] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { error } = useSelector((state) => state.user);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right", // Position in bottom right
        autoClose: 5000, // Duration to display
      });
      return;
    }
    toast.info("Loading...", {
      position: "top-center", // Position in the center
      autoClose: false, // Keep it until you explicitly close it
    });

    dispatch(registerUser({ name, email, mobile, address, password }, navigate)); 
  };

  // Check for error after registration attempt
  if (error) {
    toast.error(error, {
      position: "bottom-right", // Position in bottom right
      autoClose: 5000, // Duration to display
    });
  }

  return (
    <>
      <AllNavSections />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-2xl w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Customer Registration</h2>
          
          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          {/* Email and Mobile in Same Row */}
          <div className="flex justify-between gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
            />
          </div>

          {/* Address Input */}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          {/* Password and Confirm Password in Same Row */}
          <div className="flex justify-between gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>

          {/* Links */}
          <div className="flex justify-between mt-4">
            <Link to="/user/login" className="text-blue-500 hover:underline">
              Have an Account? Login
            </Link>
            <Link to="/password-recovery" className="text-blue-500 hover:underline">
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
        theme="colored" // Use colored theme for error notifications
      />
    </>
  );
};

export default UserRegister;
