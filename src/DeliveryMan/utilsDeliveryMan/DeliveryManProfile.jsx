import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTruck, FaClipboardList } from "react-icons/fa";
import { fetchDeliveryManProfile,updateDeliveryManProfile } from "../../actions/courierToDeliveryManActions";


const DeliveryManProfile = ({ deliveryManId }) => {
  const { profile } = useSelector((state) => state.deliveryMan);
  const dispatch = useDispatch();

  console.log(profile)

  useEffect(() => {
    dispatch(fetchDeliveryManProfile(deliveryManId));
  }, [dispatch, deliveryManId]);

  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    phone: profile?.phone || "",
    email: profile?.email || "",
    address: profile?.address || "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = () => {
    dispatch(updateDeliveryManProfile(deliveryManId, formData));
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
      });
    }
  }, [profile]);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">{`${profile?.firstName || "Delivery"} ${profile?.lastName || "Profile"}`}</h1>
        <p className="text-gray-600">Dedicated to ensuring timely and safe deliveries.</p>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex items-center space-x-3">
          <FaIdCard className="text-blue-500 text-xl" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="text-gray-700 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <FaIdCard className="text-blue-500 text-xl" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="text-gray-700 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <FaPhone className="text-blue-500 text-xl" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="text-gray-700 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500 text-xl" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="text-gray-700 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-blue-500 text-xl" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="text-gray-700 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Assigned Order & Vehicle */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Additional Information</h2>
        <div className="flex items-center space-x-3 mb-4">
          <FaTruck className="text-blue-500 text-xl" />
          <p className="text-gray-700">
            <strong>Vehicle Type:</strong> {profile?.vehicleType.name || "Not Assigned"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaClipboardList className="text-blue-500 text-xl" />
          <p className="text-gray-700">
            <strong>Assigned Order:</strong> {profile?.assignedOrder || "No Order Assigned"}
          </p>
        </div>
      </div>

      {/* Update Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

DeliveryManProfile.propTypes = {
  deliveryManId: PropTypes.string.isRequired,
};

export default DeliveryManProfile;
