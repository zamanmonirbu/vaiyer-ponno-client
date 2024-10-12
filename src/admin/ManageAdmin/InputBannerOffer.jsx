import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOfferBanner,
  updateOfferBanner,
  deleteOfferBanner,
  getOfferBanners,
} from "./../../actions/offerBannerActions";

const InputBannerOffer = () => {
  const dispatch = useDispatch();
  const { offerBanners } = useSelector((state) => state.offerBanner); // Assuming you have a reducer for this

  const [formData, setFormData] = useState({
    id: "",
    imageUrl: "",
    title: "",
    discount: 0,
    startDate: "",
    endDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch all offer banners when the component mounts
    dispatch(getOfferBanners());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateOfferBanner(formData.id, formData));
    } else {
      dispatch(createOfferBanner(formData));
    }
    resetForm();
  };

  const handleEdit = (banner) => {
    setFormData({
      id: banner._id,
      imageUrl: banner.imageUrl,
      title: banner.title,
      discount: banner.discount,
      startDate: banner.startDate.split("T")[0], // Format date for input
      endDate: banner.endDate.split("T")[0], // Format date for input
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteOfferBanner(id));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      imageUrl: "",
      title: "",
      discount: 0,
      startDate: "",
      endDate: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {isEditing ? "Update Offer" : "Create Offer"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-500 text-white rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <div>
        <h2 className="text-xl font-semibold">Existing Offers</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Discount (%)</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offerBanners?.map((banner) => (
              <tr key={banner._id}>
                <td className="border px-4 py-2">{banner.title}</td>
                <td className="border px-4 py-2">{banner.discount}%</td>
                <td className="border px-4 py-2">{new Date(banner.startDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(banner.endDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
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

export default InputBannerOffer;
