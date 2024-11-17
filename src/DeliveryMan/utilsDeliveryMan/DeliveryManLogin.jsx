import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
// import { loginDeliveryMan } from "../../actions/DeliveryManActions";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify
import { loginDeliveryMan } from "../../actions/courierToDeliveryManActions";


const DeliveryManLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirection
  const { loading, error, deliveryManInfo } = useSelector((state) => state.deliveryMan);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginDeliveryMan(loginData.email, loginData.password));
  };

  useEffect(() => {
    if (deliveryManInfo) {
      // If login is successful, show a success toast and redirect
      toast.success("Login successful!");
      navigate("/deliveryman/dashboard");
    }
    if (error) {
      // Show error toast if there's an error
      toast.error(error);
    }
  }, [deliveryManInfo, error, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Login Delivery Man</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleLoginSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white rounded ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } transition-colors`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/deliveryman/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default DeliveryManLogin;
