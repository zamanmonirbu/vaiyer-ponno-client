import { useState } from "react";
import axios from "axios";

const CategoryInput = () => {
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([{ name: "", subSubCategories: [""] }]);

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, { name: "", subSubCategories: [""] }]);
  };

  const handleSubCategoryChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].name = value;
    setSubCategories(updatedSubCategories);
  };

  const handleAddSubSubCategory = (subIndex) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subIndex].subSubCategories.push("");
    setSubCategories(updatedSubCategories);
  };

  const handleSubSubCategoryChange = (subIndex, subSubIndex, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subIndex].subSubCategories[subSubIndex] = value;
    setSubCategories(updatedSubCategories);
  };

  const handleSubmit = async () => {
    if (!category || subCategories.some(sub => !sub.name || sub.subSubCategories.some(subSub => !subSub))) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/categories", {
        category,
        subCategories,
      });
      alert("Category and Subcategories added successfully!");
      setCategory("");
      setSubCategories([{ name: "", subSubCategories: [""] }]);
    } catch (error) {
      console.error(error);
      alert("Error adding category. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Category</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category Name:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Subcategories:</h3>
        {subCategories.map((subCategory, subIndex) => (
          <div key={subIndex} className="mb-4">
            <input
              type="text"
              value={subCategory.name}
              onChange={(e) => handleSubCategoryChange(subIndex, e.target.value)}
              placeholder={`Subcategory ${subIndex + 1}`}
              className="flex-grow px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {subCategory.subSubCategories.map((subSubCategory, subSubIndex) => (
              <div key={subSubIndex} className="ml-4 mb-2">
                <input
                  type="text"
                  value={subSubCategory}
                  onChange={(e) => handleSubSubCategoryChange(subIndex, subSubIndex, e.target.value)}
                  placeholder={`Sub-Subcategory ${subSubIndex + 1}`}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddSubSubCategory(subIndex)}
              className="text-indigo-600 hover:text-indigo-900 font-medium text-sm mt-1"
            >
              + Add Sub-Subcategory
            </button>
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
        Insert Data Category
      </button>
    </div>
  );
};

export default CategoryInput;
