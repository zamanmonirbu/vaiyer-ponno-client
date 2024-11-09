// ProductForm.js

import { FaRegImages } from "react-icons/fa";

const ProductForm = ({ product, handleChange, handleCategoryChange, handleImageUpload, selectedCategory, categories,storeName }) => {
  return (
    <div className="container mx-auto p-4 bg-gray-200 rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Product On {storeName} Store</h1>
      <form className="grid grid-cols-2 gap-4">
        {/* Product Name */}
        <div className="mb-4 col-span-2">
          <label className="block mb-1">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        {/* Product Image Section */}
        <div className="mb-4 col-span-2">
          <input
            type="file"
            accept="image/*"
            id="product-image"
            onChange={handleImageUpload}
            className="hidden"
            required
          />
          <label
            htmlFor="product-image"
            className="cursor-pointer p-2 border border-gray-300 rounded text-center w-full flex justify-center items-center"
          >
            <FaRegImages className="text-3xl text-blue-500" />
            <span className="ml-2">Select Product Image</span>
          </label>
        </div>

        {/* Product Sub-Images Section */}
        <div className="mb-4 col-span-2">
          <input
            type="file"
            accept="image/*"
            id="product-sub-images"
            onChange={handleImageUpload}
            multiple
            className="hidden"
          />
          <label
            htmlFor="product-sub-images"
            className="cursor-pointer p-2 border border-gray-300 rounded text-center w-full flex justify-center items-center"
          >
            <FaRegImages className="text-3xl text-blue-500" />
            <span className="ml-2">Select Sub-Images</span>
          </label>
        </div>

        {/* Description */}
        <div className="mb-4 col-span-2">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        {/* Unit Price */}
        <div className="mb-4">
          <label className="block mb-1">Unit Price:</label>
          <input
            type="number"
            name="unitPrice"
            value={product.unitPrice}
            onChange={handleChange}
            placeholder="Unit Price"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>

        {/* Video URL */}
        <div className="mb-4">
          <label className="block mb-1">Video URL:</label>
          <input
            type="text"
            name="video"
            value={product.video}
            onChange={handleChange}
            placeholder="Video URL"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Offer */}
        <div className="mb-4">
          <label className="block mb-1">Offer:</label>
          <input
            type="number"
            name="offer"
            value={product.offer}
            onChange={handleChange}
            placeholder="Offer"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block mb-1">Gender:</label>
          <select
            name="gender"
            value={product.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block mb-1">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Category */}
        <div className="mb-4">
          <label className="block mb-1">Sub-Category:</label>
          <select
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="">Select Sub-Category</option>
            {selectedCategory.map((subCat) => (
              <option key={subCat._id} value={subCat._id}>
                {subCat.name}
              </option>
            ))}
          </select>
        </div>

      </form>
    </div>
  );
};

export default ProductForm;
