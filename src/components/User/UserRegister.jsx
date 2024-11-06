import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; 
import { registerUser } from "../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllNavSections from "../Nav/AllNavSections";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const UserRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");  
  const [address, setAddress] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { error } = useSelector((state) => state.user);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }

    dispatch(registerUser({ firstName, lastName, email, mobile, address, password }, navigate)); 
  };

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
        <div className="max-w-2xl w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center text[#0D9488]">Customer Registration</h2>
          
          {/* First Name and Last Name Input Fields */}
          <div className="flex justify-between gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
            />
          </div>

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

          {/* Password and Confirm Password with Eye Icons */}
          <div className="flex justify-between gap-4 items-center">
            <div className="relative w-1/2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="relative w-1/2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full py-2 bg-[#0D9488] text-white rounded hover:bg-[#366864]"
          >
            Register
          </button>

          {/* Links */}
          <div className="flex justify-between mt-4">
            <Link to="/user/login" className="text-[#0D9488] hover:underline">
              Have an Account? Login
            </Link>
            <Link to="/password-recovery" className="text-[#0D9488] hover:underline">
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

export default UserRegister;
