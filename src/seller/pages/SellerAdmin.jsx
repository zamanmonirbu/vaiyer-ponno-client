import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { uploadImageToImgBB } from "../../actions/imageService";
import { updateSeller } from "../../actions/sellerActions";
import { FaImage, FaStar } from "react-icons/fa";

const SellerProfile = ({ seller }) => {
  const dispatch = useDispatch();

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
      const randomNineDigitNumber = Math.floor(100000000 + Math.random() * 900000000);
      const newImageName = `${randomNineDigitNumber}-${file.name}`;
      const uploadedUrl = await uploadImageToImgBB(file, newImageName);
      if (uploadedUrl) setImageUrl(uploadedUrl);
      else alert("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSeller(seller._id, { ...formData, img: imageUrl }));
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700 text-center">Edit Seller Info</h2>
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Mobile"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Address"
              required
            />
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="About"
              rows="3"
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="cursor-pointer text-blue-600 flex items-center">
              <FaImage size={20} className="mr-2" />
              <span>Upload New Image</span>
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
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <img
              src={seller.img}
              alt={`${seller.name}'s cover`}
              className="w-full h-60 object-cover rounded-lg"
            />
            <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
              <img
                src={imageUrl}
                alt={`${seller.name}'s avatar`}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{seller.name}</h2>
            <p className="text-gray-600 text-sm">{seller.about}</p>
          </div>
          <div className="space-y-4">
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-semibold text-gray-600">Email</td>
                  <td className="py-2">{seller.email}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold text-gray-600">Mobile</td>
                  <td className="py-2">{seller.mobile}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold text-gray-600">Address</td>
                  <td className="py-2">{seller.address}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold text-gray-600">Rating</td>
                  <td className="py-2 flex items-center">
                    {seller.star}
                    <FaStar className="text-yellow-400 ml-2" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <h3 className="font-semibold text-gray-600">Account Numbers:</h3>
              <ul className="list-disc pl-6">
                {seller.accountNumbers.map((account, index) => (
                  <li key={index} className="text-gray-700">
                    {account.name}: {account.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center">
            <a
              href={seller.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Watch Video
            </a>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

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
