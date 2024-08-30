import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../actions/categoryActions";

const CategoryInput = () => {
  const [category, setCategory] = useState("");
  const [categoryImage, setImageURL] = useState("");
  const [subCategories, setSubCategories] = useState([{ name: "" }]);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, { name: "" }]);
  };

  const handleSubCategoryChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].name = value;
    setSubCategories(updatedSubCategories);
  };

  const handleSubmit = () => {
    if (!category || !categoryImage || subCategories.some((sub) => !sub.name)) {
      alert("Please fill all fields.");
      return;
    }

    const categoryData = {
      category,
      categoryImage,
      subCategories,
    };

    if (editMode) {
      dispatch(updateCategory(editCategoryId, categoryData));
      setEditMode(false);
      setEditCategoryId(null);
    } else {
      dispatch(createCategory(categoryData));
    }

    setCategory("");
    setImageURL("");
    setSubCategories([{ name: "" }]);
  };

  const handleEdit = (category) => {
    setCategory(category.category);
    setImageURL(category.categoryImage);
    setSubCategories(category.subCategories);
    setEditMode(true);
    setEditCategoryId(category._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {editMode ? "Edit Category" : "Add New Category"}
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name:
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            value={categoryImage}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Enter image URL"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Subcategories:
          </h3>
          {subCategories.map((subCategory, subIndex) => (
            <div key={subIndex} className="mb-4">
              <input
                type="text"
                value={subCategory.name}
                onChange={(e) =>
                  handleSubCategoryChange(subIndex, e.target.value)
                }
                placeholder={`Subcategory ${subIndex + 1}`}
                className="flex-grow px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
          <button
            onClick={handleAddSubCategory}
            className="mt-2 text-indigo-600 hover:text-indigo-900 font-medium text-sm"
          >
            + Add Subcategory
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {editMode ? "Update Category" : "Insert Category"}
        </button>
      </div>

      <div className="mx-auto max-w-4xl mt-8 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-center">Existing Categories:</h3>
        {categories &&
          categories.map((cat) => (
            <div key={cat._id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <img src={cat.categoryImage} alt="" className="m-auto" />
              <h4 className="font-bold text-xl">{cat.category}</h4>
              {/* <p className="text-gray-700">Image URL: {cat.categoryImage}</p> */}
              <div className="mt-4">
                <h5 className="font-medium mb-2">Subcategories:</h5>
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cat.subCategories.map((sub, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleEdit(cat)}
                  className="mr-2 bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CategoryInput;
