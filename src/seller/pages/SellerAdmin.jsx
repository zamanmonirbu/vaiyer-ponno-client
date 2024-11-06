import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { uploadImageToImgBB } from "../../actions/imageService";
import { updateSeller } from "../../actions/sellerActions";
import { FaImage } from "react-icons/fa"; // Ensure you import FaImage
import { FaStar } from 'react-icons/fa';


const SellerProfile = ({ seller }) => {
  const dispatch = useDispatch();

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...seller });
  const [imageUrl, setImageUrl] = useState(seller.img);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a 9-digit random number
      const randomNineDigitNumber = Math.floor(
        100000000 + Math.random() * 900000000
      );

      // Construct a new image name with the random number and original file name
      const newImageName = `${randomNineDigitNumber}-${file.name}`;

      // Upload image with new image name
      const uploadedUrl = await uploadImageToImgBB(file, newImageName);
      if (uploadedUrl) setImageUrl(uploadedUrl);
      else alert("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSeller(seller._id, { ...formData, img: imageUrl }));
    setIsEditing(false); // Close the edit mode after submission
  };

  return (
    <div className="w-full mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center">
            Edit Seller Info
          </h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-4 border border-gray-300 rounded"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-4 border border-gray-300 rounded"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 mt-4 border border-gray-300 rounded"
            placeholder="Mobile"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 mt-4 border border-gray-300 rounded"
            placeholder="Address"
            required
          />
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 mt-4 border border-gray-300 rounded"
            placeholder="About"
            required
          />

          {/* New Image Upload Section */}
          <div className="mt-4">
            <label className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100">
              <FaImage className="mr-2" size={20} color="#3498db" />
              Upload New Image
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden" // Hide the default file input
                accept="image/*" // Restrict file types to images
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <>
          <div className="relative mb-4">
            {/* Cover photo */}
            <img
              src={seller.img} // Use seller's image as the cover photo
              alt={`${seller.name}'s cover`}
              className="w-full h-48 rounded-lg object-cover"
            />
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
              {/* Avatar */}
              <img
                src={imageUrl}
                alt={`${seller.name}'s avatar`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mt-8">
            {seller.name}
          </h2>

          {/* Seller Info Table */}
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  <strong>Email:</strong>
                </td>
                <td className="border border-gray-300 p-2">{seller.email}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <strong>Mobile:</strong>
                </td>
                <td className="border border-gray-300 p-2">{seller.mobile}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <strong>Address:</strong>
                </td>
                <td className="border border-gray-300 p-2">{seller.address}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <strong>About:</strong>
                </td>
                <td className="border border-gray-300 p-2">{seller.about}</td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-2">
                  <strong>Star Rating:</strong>
                </td>
                <td className="border border-gray-300 p-2 flex items-center">
                  {seller.star}
                  <FaStar className="text-yellow-500 ml-1" /> {/* Star icon */}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-4 text-lg font-semibold">Account Numbers</h3>
          <ul className="list-disc list-inside mt-2">
            {seller.accountNumbers.map((account, index) => (
              <li key={index}>
                {account.name}: {account.number}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <a
              href={seller.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Watch Video
            </a>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

// Prop validation
SellerProfile.propTypes = {
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
    about: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    accountNumbers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default SellerProfile;
