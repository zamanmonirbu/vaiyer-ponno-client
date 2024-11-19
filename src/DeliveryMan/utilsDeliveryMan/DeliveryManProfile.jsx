import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruck,
  FaClipboardList,
} from "react-icons/fa";
import {
  fetchDeliveryManProfile,
  updateDeliveryManProfile,
} from "../../actions/courierToDeliveryManActions";
import { uploadImageToImgBB } from "../../actions/imageService";

const DeliveryManProfile = ({ deliveryManId }) => {
  const { profile } = useSelector((state) => state.deliveryMan);
  const dispatch = useDispatch();

  // console.log(profile)

  useEffect(() => {
    dispatch(fetchDeliveryManProfile(deliveryManId));
  }, [dispatch, deliveryManId]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    profilePicture: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        email: profile.email || "",
        address: profile.address || "",
        profilePicture: profile.profilePicture || "",
      });
      setImagePreview(profile.profilePicture || "");
    }
  }, [profile]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a unique image name
      const randomNineDigitNumber = Math.floor(100000000 + Math.random() * 900000000);
      const newImageName = `${randomNineDigitNumber}-${file.name}`;

      // Upload image to ImgBB
      const uploadedUrl = await uploadImageToImgBB(file, newImageName);
      if (uploadedUrl) {
        setImagePreview(uploadedUrl); // Update preview
        setFormData((prevState) => ({
          ...prevState,
          profilePicture: uploadedUrl,
        }));
      } else {
        alert("Image upload failed. Please try again.");
      }
    }
  };

  const handleUpdateProfile = () => {
    if (!formData.profilePicture) {
      alert("Please upload a profile picture before updating the profile.");
      return;
    }
    dispatch(updateDeliveryManProfile(deliveryManId, formData));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">{`${formData.firstName || "Delivery"} ${
          formData.lastName || "Profile"
        }`}</h1>
        <p className="text-gray-600">Dedicated to ensuring timely and safe deliveries.</p>
      </div>

      {/* Profile Picture */}
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto mb-4">
          
        {profile.image &&
            <img
              src={profile.image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-blue-500"
            />
        }

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-blue-500"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block mx-auto text-sm text-gray-600"
        />
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
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

        {/* Last Name */}
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
            <strong>Vehicle Type:</strong> {profile?.vehicleType?.name || "Not Assigned"}
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
