import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearSellerState, registerSeller } from "../../../actions/sellerActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllNavSections from "../../Nav/AllNavSections";

const SellerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.seller);

  const handleRegister = () => {
    // Validate password confirmation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }

    dispatch(registerSeller({ name, email, mobile, password, address }));
    dispatch(clearSellerState());
  };

  // Use useEffect to show error notification and handle success
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        className: 'toast-error' // Custom class for error toasts
      });
    }

    console.log(success)

    if (success) {
      toast.success("Registration successful!", {
        position: "bottom-right",
        autoClose: 5000,
      });
      navigate("/seller/login");
    }
  }, [error, success, navigate]);

  return (
    <>
      <AllNavSections />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-2xl w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Seller Registration</h2>
          {loading && <p className="text-blue-500 text-center">Registering...</p>}

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <div className="flex mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 p-2 border border-gray-300 rounded mr-2"
            />
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <div className="flex mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="flex-1 p-2 border border-gray-300 rounded mr-2"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
          <div className="flex justify-between mt-4">
            <Link to="/seller/login" className="text-blue-500 hover:underline">
              Already have an account? Login
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
      <style>
        {`
          .toast-error {
            background-color: red; /* Set background color to red */
            color: white; /* Set text color to white for visibility */
          }
        `}
      </style>
    </>
  );
};

export default SellerRegister;
