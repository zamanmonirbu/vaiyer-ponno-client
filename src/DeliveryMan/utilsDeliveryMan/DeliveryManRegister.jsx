import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCouriers } from "../../actions/courierActions";
import { getAllVehicleTypes } from "../../actions/vehicleTypeActions";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { registerDeliveryMan } from "../../actions/courierToDeliveryManActions";

const DeliveryManRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, error } = useSelector((state) => state.deliveryMan);
  const { couriers } = useSelector((state) => state.courier);
  const { vehicleTypes } = useSelector((state) => state.vehicleType);

  // console.log(success, loading, error);

  const [deliveryManData, setDeliveryManData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nid: "",
    address: "",
    vehicleType: "",
    courier: "",
    password: "", 
  });

  useEffect(() => {
    dispatch(getAllVehicleTypes());
    dispatch(getAllCouriers());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Delivery Man registered successfully!");
      setTimeout(() => {
        navigate("/deliveryman/login"); // Navigate after success
        
      }, 2000); // Delay navigation for 2 seconds to let the toast message display
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate]); // Added `navigate` to the dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryManData({ ...deliveryManData, [name]: value });
  };

  const handleRegisterSubmit = (e) => {
    console.log(deliveryManData);
    e.preventDefault();
    dispatch(registerDeliveryMan(deliveryManData));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Register Delivery Man
      </h2>
      <form
        onSubmit={handleRegisterSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl"
      >
        {/* Grid for smaller inputs (two columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            value={deliveryManData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lastName"
            value={deliveryManData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="nid"
            value={deliveryManData.nid}
            onChange={handleInputChange}
            placeholder="NID"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            value={deliveryManData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Email field as full width */}
        <input
          type="email"
          name="email"
          value={deliveryManData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Password Field */}
        <input
          type="password"
          name="password"
          value={deliveryManData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Large inputs in single column */}
        <input
          type="text"
          name="address"
          value={deliveryManData.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Vehicle Type Dropdown */}
        {/* Vehicle Type Dropdown */}
        <select
          name="vehicleType"
          value={deliveryManData.vehicleType}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
        >
          <option value="">Select Vehicle Type</option>
          {vehicleTypes?.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {" "}
              {/* Send vehicle._id instead of vehicle.name */}
              {vehicle.name}
            </option>
          ))}
        </select>

        {/* Courier Dropdown */}
        <select
          name="courier"
          value={deliveryManData.courier}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
        >
          <option value="">Select Courier</option>
          {couriers?.map((courier) => (
            <option key={courier._id} value={courier._id}>
              {" "}
              {/* Send courier._id instead of courier.name */}
              {courier.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/deliveryman/login" className="text-blue-500 underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default DeliveryManRegister;
