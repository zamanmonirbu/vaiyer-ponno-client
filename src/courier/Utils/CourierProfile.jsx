import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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

  const [formData, setFormData] = useState({
    email: profile?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
  });

  const [image, setImageUrl] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
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
    <div className="max-w-lg mx-auto p-8 shadow-lg rounded-lg bg-gradient-to-r from-white to-blue-50">
      <div className="text-center">
        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={
              profile?.image ||
              "https://via.placeholder.com/150?text=No+Image"
            }
            alt="Admin Profile"
            className="w-full h-full rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {profile?.name || "Courier Profile"}
        </h2>
        <p className="text-sm text-gray-500">{profile?.email}</p>
      </div>

      {/* Image Upload */}
      <div className="mt-6">
        <ImageUpload onImageUpload={handleImageUpload} />
        {image && (
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-20 h-20 mx-auto rounded-full mt-4 shadow-sm"
          />
        )}
      </div>

      {/* Profile Details */}
      <div className="mt-6 space-y-6">
        {/* Email */}
        <div className="flex items-center bg-white shadow-sm p-4 rounded-lg space-x-3">
          <FaEnvelope className="text-blue-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="flex-1 border-none bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center bg-white shadow-sm p-4 rounded-lg space-x-3">
          <FaPhone className="text-blue-500" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="flex-1 border-none bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter phone"
          />
        </div>

        {/* Address */}
        <div className="flex items-center bg-white shadow-sm p-4 rounded-lg space-x-3">
          <FaMapMarkerAlt className="text-blue-500" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="flex-1 border-none bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter address"
          />
        </div>
      </div>

      {/* Update Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleUpdateProfile}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600 transition duration-200"
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
