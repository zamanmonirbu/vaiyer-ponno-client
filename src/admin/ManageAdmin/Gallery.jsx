import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGalleryItem,
  deleteGalleryItem,
  fetchGalleryItems,
  updateGalleryItem,
} from "../../actions/galleryActions";

const Gallery = () => {
  const dispatch = useDispatch();
  const galleryItems = useSelector((state) => state.galleryItems.galleryItems);

  const [newItem, setNewItem] = useState({
    image: "",
    text: "",
    subText: "",
    color: "",
    category: "",
    isMedium: false,
    isLarge: false,
  });

  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(fetchGalleryItems());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setNewItem({
      ...newItem,
      [name]: fieldValue,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setEditItem({
      ...editItem,
      [name]: fieldValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      dispatch(updateGalleryItem(editItem._id, editItem));
      setEditItem(null);
    } else {
      dispatch(createGalleryItem(newItem));
      setNewItem({
        image: "",
        text: "",
        subText: "",
        color: "",
        category: "",
        isMedium: false,
        isLarge: false,
      });
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteGalleryItem(id));
    }
  };

  return (
    <div className="manage-gallery-container p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Gallery</h1>

      {/* Create/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block">Image URL:</label>
          <input
            type="text"
            name="image"
            value={editItem ? editItem.image : newItem.image}
            onChange={editItem ? handleEditChange : handleChange}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Text:</label>
          <input
            type="text"
            name="text"
            value={editItem ? editItem.text : newItem.text}
            onChange={editItem ? handleEditChange : handleChange}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Sub Text:</label>
          <input
            type="text"
            name="subText"
            value={editItem ? editItem.subText : newItem.subText}
            onChange={editItem ? handleEditChange : handleChange}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Text Color:</label>
          <input
            type="text"
            name="color"
            value={editItem ? editItem.color : newItem.color}
            onChange={editItem ? handleEditChange : handleChange}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Category:</label>
          <input
            type="text"
            name="category"
            value={editItem ? editItem.category : newItem.category}
            onChange={editItem ? handleEditChange : handleChange}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isMedium"
              checked={editItem ? editItem.isMedium : newItem.isMedium}
              onChange={editItem ? handleEditChange : handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">Medium Size</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isLarge"
              checked={editItem ? editItem.isLarge : newItem.isLarge}
              onChange={editItem ? handleEditChange : handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">Large Size</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 rounded"
        >
          {editItem ? "Update" : "Create"}
        </button>
      </form>

      {/* Gallery Items List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Text
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sub Text
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {galleryItems.map((item, index) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div
                    className="w-16 h-16 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.text}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.subText}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.color}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.isMedium && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Medium
                    </span>
                  )}
                  {item.isLarge && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                      Large
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white p-2 rounded"
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

export default Gallery;
