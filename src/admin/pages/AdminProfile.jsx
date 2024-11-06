import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { uploadImageToImgBB } from '../../actions/imageService';
import { updateAdmin } from '../../actions/adminActions';
import { FaImage } from 'react-icons/fa';

const AdminProfile = ({ admin }) => {
  const dispatch = useDispatch();

  // console.log("admin",admin)

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: admin.name, email: admin.email });
  const [imageUrl, setImageUrl] = useState(admin.img);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a 9-digit random number
      const randomNineDigitNumber = Math.floor(100000000 + Math.random() * 900000000);
  
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
    dispatch(updateAdmin(admin._id, { ...formData, img: imageUrl }));
    setIsEditing(false); // Close edit mode after submission
  };

  return (
    <div className="w-full mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center">Edit Admin Info</h2>
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

          {/* Image Upload Section */}
          <div className="mt-4">
            <label className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100">
              <FaImage className="mr-2" size={20} color="#3498db" />
              Upload New Image
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
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
            <img 
              src={admin.img}
              alt={`${admin.name}'s cover`} 
              className="w-full h-48 rounded-lg object-cover" 
            />
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
              <img 
                src={admin.img} 
                alt={`${admin.name}'s avatar`} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" 
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mt-8">{admin.name}</h2>

          <table className="w-full mt-4 border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2"><strong>Name:</strong></td>
                <td className="border border-gray-300 p-2">{admin.name}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><strong>Email:</strong></td>
                <td className="border border-gray-300 p-2">{admin.email}</td>
              </tr>
            </tbody>
          </table>

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
AdminProfile.propTypes = {
  admin: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminProfile;
