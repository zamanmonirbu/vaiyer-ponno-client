import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTruck } from "react-icons/fa";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { getCourierProfileById, updateCourierProfile } from "../../actions/courierActions";

const CourierProfile = ({ admin }) => {
  const adminId = admin._id;
  const { profile } = useSelector((state) => state.courier);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourierProfileById(adminId));
  }, [dispatch, adminId]);

  // Local state for editable fields
  const [formData, setFormData] = useState({
    email: profile?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    vehicleType: profile?.vehicleType || "",
  });

  const [image, setImageUrl] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        vehicleType: profile.vehicleType,
      });
    }
  }, [profile]);

  const handleImageUpload = (uploadedUrl) => {
    setImageUrl(uploadedUrl);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = () => {
    dispatch(updateCourierProfile(adminId, { ...formData, image }));
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-md rounded bg-white">
      <div>
        <img src={profile?.image} alt="AdminImage" className="rounded-full w-32 h-32 mx-auto" />
      </div>
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        {profile?.name || "Courier Profile"}
      </h2>

      {/* Profile Image Upload */}
      <ImageUpload onImageUpload={handleImageUpload} />
      {image && (
        <img
          src={image}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full mb-4"
        />
      )}

      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-gray-600" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="text-gray-700 font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <FaPhone className="text-gray-600" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="text-gray-700 font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-gray-600" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="text-gray-700 font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Vehicle Type */}
        <div className="flex items-center space-x-3">
          <FaTruck className="text-gray-600" />
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            className="text-gray-700 font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdateProfile}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

CourierProfile.propTypes = {
  admin: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourierProfile;
