import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBanner,
  deleteBanner,
  getBanners,
} from "../../actions/bannerActions";
import { uploadImageToImgBB } from "../../actions/imageService"; // Import your image upload function
import { FaImage } from "react-icons/fa";

const BannerManager = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const dispatch = useDispatch();
  const { banners, error } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const randomNineDigitNumber = Math.floor(
          100000000 + Math.random() * 900000000
        );
        const newImageName = `${randomNineDigitNumber}-${file.name}`;
        const uploadedUrl = await uploadImageToImgBB(file, newImageName);
        setBannerUrl(uploadedUrl); // Set the uploaded image URL
      } catch (error) {
        alert("Image upload failed. Please try again.",error);
      }
    }
  };

  const handleAddBanner = () => {
    if (bannerUrl) {
      dispatch(createBanner(bannerUrl));
      setBannerUrl("");
    } else {
      alert("Please upload a banner image.");
    }
  };

  const handleDeleteBanner = (id) => {
    dispatch(deleteBanner(id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Banner Manager</h2>

      <div className="flex mb-4">
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
        <button
          onClick={handleAddBanner}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!bannerUrl} // Disable button until image is uploaded
        >
          Add Banner
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        <h3 className="text-xl mb-2">Current Banners:</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-2 border-r border-gray-300">#</th>
              <th className="p-2 border-r border-gray-300">Banner Image</th>
              <th className="p-2 border-r border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner._id} className="border-b border-gray-300">
                <td className="p-2 text-center border-r border-gray-300">
                  {index + 1}
                </td>
                <td className="p-2 text-center border-r border-gray-300">
                  <img
                    src={banner.imageUrl}
                    alt="Banner"
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDeleteBanner(banner._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerManager;
