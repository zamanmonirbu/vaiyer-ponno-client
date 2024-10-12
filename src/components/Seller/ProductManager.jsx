import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getSellerProducts,
} from "../../actions/productActions";
import { fetchCategories } from "../../actions/categoryActions";

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
    cities: [],
    quantity: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [newSubImage, setNewSubImage] = useState("");
  const [newCity, setNewCity] = useState("");

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { categories = [] } = useSelector((state) => state.categories);

  // Fetch categories and seller products on component mount
  useEffect(() => {
    dispatch(getSellerProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Set seller location if available
  useEffect(() => {
    if (seller?.location) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        sellerLocation: seller.location,
      }));
    }
  }, [seller]);

  // Update subcategories based on the selected category
  useEffect(() => {
    if (product.category) {
      const selectedCat = categories.find(
        (cat) => cat._id === product.category
      );
      setSelectedCategory(
        selectedCat && Array.isArray(selectedCat.subCategories)
          ? selectedCat.subCategories
          : []
      );
    }
  }, [product.category, categories]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Handle seller location input change
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      sellerLocation: { ...prevProduct.sellerLocation, [name]: value },
    }));
  };

  // Handle category selection and reset subcategory if category changes
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

  // Handle adding a new sub-image
  const handleSubImageChange = (e) => {
    setNewSubImage(e.target.value);
  };

  const addSubImage = () => {
    if (newSubImage) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        subImages: [...prevProduct.subImages, newSubImage],
      }));
      setNewSubImage("");
    }
  };

  // Handle adding a new city
  const handleCityChange = (e) => {
    setNewCity(e.target.value);
  };

  const addCity = () => {
    if (newCity && !product.cities.includes(newCity)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        cities: [...prevProduct.cities, newCity],
      }));
      setNewCity("");
    }
  };

  // Handle form submission for adding/updating product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await dispatch(updateProduct(editingId, product));
      } else {
        await dispatch(createProduct(product));
      }
      // Reset the form after submission
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
        cities: [],
        quantity: "",
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  // Handle editing a product
  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
    setEditingId(product?._id);
    setSelectedCategory(
      categories.find((cat) => cat?._id === product?.category)?.subCategories ||
        []
    );
  };

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="imageURL"
          value={product.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border border-gray-300 rounded col-span-2"
          required
        />
        <input
          type="number"
          name="unitPrice"
          value={product.unitPrice}
          onChange={handleChange}
          placeholder="Unit Price"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="video"
          value={product.video}
          onChange={handleChange}
          placeholder="Video URL"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="offer"
          value={product.offer}
          onChange={handleChange}
          placeholder="Offer"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <select
          name="gender"
          value={product.gender}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="all">All</option>
        </select>
        <select
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          name="subCategory"
          value={product.subCategory}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="">Select Subcategory</option>
          {selectedCategory.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Seller location fields */}
        <input
          type="text"
          name="lat"
          value={product.sellerLocation.lat}
          onChange={handleLocationChange}
          placeholder="Latitude"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="lng"
          value={product.sellerLocation.lng}
          onChange={handleLocationChange}
          placeholder="Longitude"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="city"
          value={product.sellerLocation.city}
          onChange={handleLocationChange}
          placeholder="City"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="road"
          value={product.sellerLocation.road}
          onChange={handleLocationChange}
          placeholder="Road"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="postalCode"
          value={product.sellerLocation.postalCode}
          onChange={handleLocationChange}
          placeholder="Postal Code"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="area"
          value={product.area}
          onChange={handleChange}
          placeholder="Area"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />

        {/* Sub Images */}
        <input
          type="text"
          value={newSubImage}
          onChange={handleSubImageChange}
          placeholder="Add Sub Image URL"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={addSubImage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Sub Image
        </button>
        <div className="col-span-2">
          {product.subImages.length > 0 && (
            <ul>
              {product.subImages.map((subImage, index) => (
                <li key={index}>{subImage}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Cities */}
        <input
          type="text"
          value={newCity}
          onChange={handleCityChange}
          placeholder="Add City"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={addCity}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add City
        </button>
        <div className="col-span-2">
          {product.cities.length > 0 && (
            <ul>
              {product.cities.map((city, index) => (
                <li key={index}>{city}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="col-span-2 p-2 bg-green-500 text-white rounded"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-500 p-2">Name</th>
              <th className="border border-gray-500 p-2">Price</th>
              <th className="border border-gray-500 p-2">Category</th>
              <th className="border border-gray-500 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                 <td className="border border-gray-500 p-2">
                  {product.name.length > 20
                    ? product.name.slice(0, 40) + "..."
                    : product.name}
                </td>
                <td className="border border-gray-500 p-2">{product.unitPrice}</td>
                <td className="border border-gray-500 p-2">
                  {categories.find((cat) => cat._id === product.category)?.name}
                </td>
                <td className="border border-gray-500 p-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mr-2 p-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManager;
