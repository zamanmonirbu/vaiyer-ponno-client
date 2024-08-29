import { useState, useEffect } from "react";
import axios from "axios";

const ProductInput = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    imageURL: "",
    subImages: ["", "", "", "", ""],
    unitPrice: "",
    description: "",
    video: "",
    category: "",
    subCategory: "",
    subSubCategory: "",
    ratings: "",
    comments: [""],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/categories/${selectedCategory}`
          );
          setSubCategories(response.data.subCategories);
        } catch (error) {
          console.error("Error fetching sub-categories:", error);
        }
      };
      fetchSubCategories();
    } else {
      setSubCategories([]);
      setSubSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (formData.subCategory) {
      const selectedSubCategory = subCategories.find(
        (sc) => sc._id === formData.subCategory
      );
      setSubSubCategories(
        selectedSubCategory ? selectedSubCategory.subSubCategories : []
      );
    } else {
      setSubSubCategories([]);
    }
  }, [formData.subCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("Product added successfully!");
      setFormData({
        name: "",
        imageURL: "",
        subImages: ["", "", "", "", ""],
        unitPrice: "",
        description: "",
        video: "",
        category: "",
        subCategory: "",
        subSubCategory: "",
        ratings: "",
        comments: [""],
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  console.log(selectedCategory);
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Image URL:</label>
          <input
            type="text"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Sub Images:</label>
          {formData.subImages.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              onChange={(e) => {
                const newSubImages = [...formData.subImages];
                newSubImages[index] = e.target.value;
                setFormData({ ...formData, subImages: newSubImages });
              }}
              placeholder={`Sub image ${index + 1}`}
              className="p-2 border rounded"
            />
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Unit Price:</label>
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            placeholder="Enter unit price"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Video URL:</label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="Enter video URL"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => {
              handleChange(e);
              setSelectedCategory(e.target.value);
            }}
            className="p-2 border rounded"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Sub-category:</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select sub-category</option>
            {selectedCategory?.subCategories?.map((subCat) => (
              <option key={subCat._id} value={subCat._id}>
                {subCat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Sub-sub-category:</label>
          <select
            name="subSubCategory"
            value={formData.subSubCategory}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select sub-sub-category</option>
            {subSubCategories.map((subSubCat) => (
              <option key={subSubCat._id} value={subSubCat._id}>
                {subSubCat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Ratings:</label>
          <input
            type="number"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
            placeholder="Enter ratings (e.g., 4)"
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Comments:</label>
          {formData.comments.map((comment, index) => (
            <input
              key={index}
              type="text"
              value={comment}
              onChange={(e) => {
                const newComments = [...formData.comments];
                newComments[index] = e.target.value;
                setFormData({ ...formData, comments: newComments });
              }}
              placeholder={`Comment ${index + 1}`}
              className="p-2 border rounded"
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, comments: [...formData.comments, ""] })
            }
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            + Add Comment
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default ProductInput;
