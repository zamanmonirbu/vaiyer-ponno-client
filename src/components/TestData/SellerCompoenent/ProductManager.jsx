import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  createProduct,
  deleteProduct,
  updateProduct,
  getSellerProducts,
} from "../../../actions/productActions";
import { fetchCategories } from "../../../actions/categoryActions";
import { uploadImageToImgBB } from "../../../actions/imageService";

const ProductManager = ({ seller }) => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    subImages: [],
    unitPrice: "",
    description: "",
    video: "",
    category: "",
    subCategory: "",
    offer: "",
    gender: "",
    sellerLocation: {
      lat: "",
      lng: "",
      city: "",
      road: "",
      postalCode: "",
    },
    area: "",
    quantity: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { categories = [] } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getSellerProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (seller?.location) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        sellerLocation: seller.location,
      }));
    }
  }, [seller]);

  useEffect(() => {
    if (product.category) {
      const selectedCat = categories.find((cat) => cat._id === product.category);
      setSelectedCategory(
        selectedCat && Array.isArray(selectedCat.subCategories)
          ? selectedCat.subCategories
          : []
      );
    }
  }, [product.category, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      sellerLocation: { ...prevProduct.sellerLocation, [name]: value },
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: categoryId,
      subCategory: "",
    }));

    const selectedCat = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(
      selectedCat && Array.isArray(selectedCat.subCategories)
        ? selectedCat.subCategories
        : []
    );
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const randomNineDigitNumber = Math.floor(
          100000000 + Math.random() * 900000000
        );
        const newImageName = `${randomNineDigitNumber}-${file.name}`;
        return await uploadImageToImgBB(file, newImageName);
      })
    );

    if (!product.imageURL && uploadedUrls.length > 0) {
      setProduct((prev) => ({
        ...prev,
        imageURL: uploadedUrls[0],
      }));
    }

    setProduct((prev) => ({
      ...prev,
      subImages: [
        ...prev.subImages,
        ...uploadedUrls.slice(1).filter(Boolean),
      ],
    }));

    // Optionally send uploaded URLs to the backend
    // dispatch(uploadImageUrls(uploadedUrls));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateProduct(editingId, product));
      } else {
        await dispatch(createProduct(product));
      }
      setProduct({
        name: "",
        imageURL: "",
        subImages: [],
        unitPrice: "",
        description: "",
        video: "",
        category: "",
        subCategory: "",
        offer: "",
        gender: "",
        sellerLocation: {
          lat: "",
          lng: "",
          city: "",
          road: "",
          postalCode: "",
        },
        area: "",
        quantity: "",
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
    setEditingId(product?._id);
    setSelectedCategory(
      categories.find((cat) => cat?._id === product?.category)?.subCategories ||
        []
    );
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-4">
        {/** Input Fields with Custom Styles */}
        {/** Add more styling classes to improve appearance */}
        <div className="mb-4 col-span-2">
          <label className="block mb-1">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">Product Sub-Images:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">Product Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Product Unit Price:</label>
          <input
            type="number"
            name="unitPrice"
            value={product.unitPrice}
            onChange={handleChange}
            placeholder="Unit Price"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Product Video:</label>
          <input
            type="text"
            name="video"
            value={product.video}
            onChange={handleChange}
            placeholder="Video URL"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Product Offer:</label>
          <input
            type="number"
            name="offer"
            value={product.offer}
            onChange={handleChange}
            placeholder="Offer"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Product Gender:</label>
          <select
            name="gender"
            value={product.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Product Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
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

        <div className="mb-4">
          <label className="block mb-1">Product Sub-Category:</label>
          <select
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          >
            <option value="">Select Sub-Category</option>
            {selectedCategory.map((subCat) => (
              <option key={subCat._id} value={subCat._id}>
                {subCat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Product Area:</label>
          <input
            type="text"
            name="area"
            value={product.area}
            onChange={handleChange}
            placeholder="Area"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Product Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <h2 className="text-lg font-bold col-span-2 mb-4">Seller Location:</h2>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">City:</label>
          <input
            type="text"
            name="city"
            value={product.sellerLocation.city}
            onChange={handleLocationChange}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">Road:</label>
          <input
            type="text"
            name="road"
            value={product.sellerLocation.road}
            onChange={handleLocationChange}
            placeholder="Road"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={product.sellerLocation.postalCode}
            onChange={handleLocationChange}
            placeholder="Postal Code"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">Latitude:</label>
          <input
            type="text"
            name="lat"
            value={product.sellerLocation.lat}
            onChange={handleLocationChange}
            placeholder="Latitude"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block mb-1">Longitude:</label>
          <input
            type="text"
            name="lng"
            value={product.sellerLocation.lng}
            onChange={handleLocationChange}
            placeholder="Longitude"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 col-span-2">
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4 text-center">Product List</h2>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {products.map((prod) => (
          <li key={prod._id} className="mb-2 flex justify-between items-center">
            <span>{prod.name}</span>
            <div>
              <button
                onClick={() => handleEdit(prod)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prod._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductManager.propTypes = {
  seller: PropTypes.object,
};

export default ProductManager;
